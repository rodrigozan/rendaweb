import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient();

import IUser from "interfaces/IUser";

export class UserService {
  static async create(data: any): Promise<IUser | null> {
    const { name, username, email, password, celular, active, role } = data;
    const hashedPassword = await bcrypt.hash(password, 8)

    const result: any = await prisma.$queryRaw`
      EXEC sp_rwms_create_user
          @name = ${name},
          @username = ${username},
          @email = ${email},  
          @password = ${hashedPassword},
          @celular = ${celular},
          @active = ${active},
          @role = ${role} 
    `;

    return result;
  }

  static async get() {
    const result: any = await prisma.$queryRaw`
        EXEC sp_rwms_select_users
    `;
    return result;
  }

  static async getById(id: number): Promise<IUser | null> {
    const result: any = await prisma.$queryRaw`
        EXEC sp_rwms_select_user @id = ${id}
    `;

    return result[0];
  }

  static async getOne(field: string): Promise<IUser | null> {
    if (!field) {
        return null;
    }

    const result: any = await prisma.$queryRaw`
        EXEC sp_rwms_search_users @field = ${field}
    `;

    return result[0];
}

  static async update(id: number, data: any): Promise<IUser | null> {
    const { name, username, email, password, celular, active, role } = data;
    const hashedPassword = await bcrypt.hash(password, 8)

    const result: any = await prisma.$queryRaw`
        EXEC sp_rwms_update_user
            @id = ${id},
            @name = ${name},
            @username = ${username},
            @password = ${hashedPassword},
            @email = ${email},
            @celular = ${celular},
            @active = ${active},
            @role = ${role}
    `;

    return result[0]
  }

  static async delete(id: number): Promise<IUser | null> {
    const result: any = await prisma.$queryRaw`
        EXEC sp_rwms_delete_user @id = ${id}
    `;

    return result
  }  
}

