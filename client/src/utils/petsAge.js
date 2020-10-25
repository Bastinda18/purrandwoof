const petsAge = (age) => {
	if (age === '') {
		return age;
	} else if (Number(age)) {
		return age + ' years old';
	} else {
		return age;
	}
};

export default petsAge;
