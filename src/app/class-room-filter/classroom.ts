// export interface Country {
//     name?: string;
//     code?: string;
// }

export interface Teacher {
    id?: number;
    name?: string;
    image?: string;
}

export interface Classroom {
    id?: number;
    className?: string;
    teacher?: Teacher;
    // company?: string;
    // date?: string;
    // status?: string;
    // representative?: Representative;
}