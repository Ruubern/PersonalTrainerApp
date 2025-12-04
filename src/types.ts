export type Customer = {
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
    _links: {
        self: string;
        customer: string;
        trainings: string;
    }
}

export type CustomerForm = Omit<Customer, "_links">;

export type Training = {
    date: Date;
    duration: number;
    activity: string;
    _links: {
        self: string;
        training: string;
        customer: string;
    }

}

export type TrainingForm = {
    date: Date;
    duration: number;
    activity: string;
    customer: string;
}