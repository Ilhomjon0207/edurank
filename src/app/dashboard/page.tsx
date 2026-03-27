import React from 'react'
import prisma from '../../../prisma/client';

const Dashboard = async () => {
    // Получаем всех пользователей
    const users = await prisma.user.findFirst();
    console.log(users);
    return (
        <div>
            Dashboard
        </div>
    )
}

export default Dashboard
