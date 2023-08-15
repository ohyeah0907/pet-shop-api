// import { RoleSchedule, ObjectState } from "@prisma/client";
// import prisma from "../prisma";
// const findById = async (id: number) => {
//     const roleSchedule = await prisma.roleSchedule.findUnique({
//         include: {
//             role_home: true,
//             schedule_weeks: true,
//         },
//         where: {
//             id: id,
//             NOT: {
//                 state: ObjectState.DELETED
//             }
//         }
//     });
//     return roleSchedule;
// }

// const findAll = async () => {
//     const roleSchedules = await prisma.roleSchedule.findMany({
//         include: {
//             role_home: true,
//             schedule_weeks: true,
//         },
//         where: {
//             NOT: {
//                 state: ObjectState.DELETED,
//             }
//         }
//     });
//     return roleSchedules;
// }
// const save = async (roleSchedule: RoleSchedule) => {
//     if (roleSchedule.id) {
//         return prisma.roleSchedule.update({
//             where: {
//                 id: roleSchedule.id
//             },
//             data: {
//                 role_home: {
//                     connect: {
//                         id: roleSchedule.role_home_id
//                     }
//                 },
//                 started_at: roleSchedule.started_at,
//                 ended_at: roleSchedule.ended_at,
//                 state: roleSchedule.state,
//                 deleted_at: roleSchedule.deleted_at,
//             },
//             include: {
//                 role_home: true,
//             }
//         })
//     }
//     return prisma.roleSchedule.create({
//         data: {
//             role_home: {
//                 connect: {
//                     id: roleSchedule.role_home_id
//                 }
//             },
//             started_at: roleSchedule.started_at,
//             ended_at: roleSchedule.ended_at,
//         },
//         include: {
//             role_home: true,
//         }
//     })
// }

// export default {
//     save,
//     findById,
//     findAll,
// }