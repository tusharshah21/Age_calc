import React, { useState, useEffect } from 'react';

function AgeCalculator() {
  const [day, setDay] = useState('24');
  const [month, setMonth] = useState('09');
  const [year, setYear] = useState('1984');
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });
  const [errors, setErrors] = useState({ day: '', month: '', year: '' });

  useEffect(() => {
    calculateAge();
  }, []);

  const calculateAge = () => {
    const parsedDay = parseInt(day);
    const parsedMonth = parseInt(month);
    const parsedYear = parseInt(year);

    const today = new Date();
    const birth = new Date(`${parsedYear}-${parsedMonth}-${parsedDay}`);
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (months < 0 || (months === 0 && today.getDate() < birth.getDate())) {
      years--;
      months += 12;
    }

    if (days < 0) {
      months--;
      const temp = new Date(today.getFullYear(), today.getMonth(), 0);
      days += temp.getDate();
    }

    setAge({ years, months, days });
  };

  const handleCalculateAge = () => {
    const parsedDay = parseInt(day);
    const parsedMonth = parseInt(month);
    const parsedYear = parseInt(year);

    let valid = true;
    const newErrors = { day: '', month: '', year: '' };

    if (!day) {
      newErrors.day = 'This field is required';
      valid = false;
    } else if (isNaN(parsedDay) || parsedDay < 1 || parsedDay > 31) {
      newErrors.day = 'Must be a valid day';
      valid = false;
    }

    if (!month) {
      newErrors.month = 'This field is required';
      valid = false;
    } else if (isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
      newErrors.month = 'Must be a valid month';
      valid = false;
    }

    if (!year) {
      newErrors.year = 'This field is required';
      valid = false;
    } else if (isNaN(parsedYear) || parsedYear < 1900 || parsedYear > new Date().getFullYear()) {
      newErrors.year = 'Must be a valid year';
      valid = false;
    }

    if (valid) {
      calculateAge();
      setErrors({ day: '', month: '', year: '' });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="poppins-regular flex flex-col items-center justify-center min-h-screen">
    <div className="bg-white p-4 py-12 lg:p-12 rounded-3xl rounded-br-[6rem] lg:rounded-br-[11rem] lg:w-[48%] w-[89%]">
      <div className="flex mb-4	text-[20px] lg:text-[32px]">
        <div className="flex flex-col mr-8">
        <p className={`text-sm tracking-[0.2rem] poppins-bold text-[color:hsl(0,_1%,_44%)] mb-1 lg:mb-2 ${errors.day ? 'text-red-500' : ''}`}>DAY</p>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className={`cursor-pointer px-4 py-2 font-bold w-20 lg:w-36 rounded-md border border-gray-300 ${errors.day ? 'border-red-500' : ''}`}
            placeholder="DD"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
          {errors.day && <p className="text-red-500 text-sm poppins-regular-italic mt-2">{errors.day}</p>}
        </div>
        <div className="flex flex-col mr-8">
        <p className={`text-sm tracking-[0.2rem] poppins-bold text-[color:hsl(0,_1%,_44%)] mb-1 lg:mb-2 ${errors.month ? 'text-red-500' : ''}`}>MONTH</p>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className={`cursor-pointer px-4 py-2 font-bold w-20 lg:w-36 rounded-md border border-gray-300 ${errors.month ? 'border-red-500' : ''}`}
            placeholder="MM"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
          {errors.month && <p className="text-red-500 text-sm poppins-regular-italic mt-2">{errors.month}</p>}
        </div>
        <div className="flex flex-col">
        <p className={`text-sm tracking-[0.2rem] poppins-bold text-[color:hsl(0,_1%,_44%)] mb-1 lg:mb-2 ${errors.year ? 'text-red-500' : ''}`}>YEAR</p>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className={`cursor-pointer px-4 py-2 font-bold w-20 lg:w-36 rounded-md border border-gray-300 ${errors.year ? 'border-red-500' : ''}`}
            placeholder="YYYY"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          {errors.year && <p className="text-red-500 text-sm poppins-regular-italic mt-2">{errors.year}</p>}
        </div>
      </div>
      <div className="flex items-center lg:-my-4 ">
      <div className="w-full lg:w-full h-[2px] bg-[color:hsl(0,0%,94%)] "></div>
      <button
        className="bg-[color:hsl(259,_100%,_65%)] hover:bg-[color:hsl(0,_0%,_8%)] text-white  font-bold p-4 rounded-full"
        onClick={handleCalculateAge}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="38" viewBox="0 0 46 44"><g fill="none" stroke="#FFF" stroke-width="2"><path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"/></g></svg>
      </button>
      <div className="w-full block lg:hidden h-[2px] bg-[color:hsl(0,0%,94%)] "></div>

      </div>
      <div className="mt-4 poppins-extrabold-italic text-6xl lg:text-[5.5rem] lg:leading-[5.5rem]">
        <p className="">
          <span className="text-[color:hsl(259,_100%,_65%)]">{age.years}</span> years
        </p>
        <p className="">
        <span className="text-[color:hsl(259,_100%,_65%)]">{age.months}</span> months
        </p>
        <p className="">
        <span className="text-[color:hsl(259,_100%,_65%)]">{age.days}</span> days
        </p>
      </div>
      </div>
    </div>
  );
}

export default AgeCalculator;
