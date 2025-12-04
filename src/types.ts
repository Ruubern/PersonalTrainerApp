export type Customer = {
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
    _links: {
        self: { href: string };
        customer: { href: string };
        trainings: { href: string };
    }
}

export type CustomerForm = Omit<Customer, "_links">;

export type Training = {
    id: number;
    date: Date;
    duration: number;
    activity: string;
    customer: {
        id: number;
        firstname: string;
        lastname: string;
        streetaddress: string;
        postcode: string;
        city: string;
        email: string;
        phone: string;
    }
    _links: {
        self: { href: string };
        training: { href: string };
        customer: { href: string };
    }
}

export type TrainingForm = {
    date: Date;
    duration: number;
    activity: string;
    customer: string;
}

export type CalendarEvent = {
    id: string;
    title: string;
    start: string;
    end: string;
};

export type ChartData = {
    activity: string;
    totalDuration: number;
};