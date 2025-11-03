import dayjs from "dayjs";

export const getExactAge = (birthday?: string | Date | dayjs.Dayjs | null): number | null => {
    if (!birthday) return null;

    const birthDate = dayjs(birthday);
    const today = dayjs();

    let age = today.diff(birthDate, "year");
    if (today.isBefore(birthDate.add(age, "year"))) {
        age--;
    }

    return age;
};
