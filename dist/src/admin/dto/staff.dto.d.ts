export declare class AddStaff {
    email: string;
    password: string;
    name: string;
    image: string;
    country_code: string;
    phone_no: string;
    roles: string[];
}
export declare class EditStaff {
    email: string;
    name: string;
    image: string;
    country_code: string;
    phone_no: string;
    roles: string[];
}
export declare class StaffList {
    search: string;
    pagination: Number;
    limit: Number;
}
