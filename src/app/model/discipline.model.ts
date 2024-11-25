import { StudentModel } from "./student.model";

export interface DisciplineModel {
    id: number,
    teacher_id: number,
    name: string,
    department: string,
    is_active: boolean
    students: StudentModel[],
}