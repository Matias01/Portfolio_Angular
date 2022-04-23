export interface PersonalData {
    id: number;
    name: string;
    backImage: string;
    image: string;
    position: string;
    company: {
        name: string;
        img: string;
        url: string;
    };
    school: {
        name: string;
        img: string;
        url: string;
    };
    facebook: string;
    twitter: string;
    instagram: string;
    ubication: string;
    about: string;
}