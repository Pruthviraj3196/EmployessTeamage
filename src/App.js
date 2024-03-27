import React, { useState } from 'react';
import './App.css';

const employees = [
  {"id":1,"first_name":"Jaymee","last_name":"Imm","email":"jimm0@craigslist.org","gender":"Genderqueer","age":80},
  {"id":2,"first_name":"Jody","last_name":"Themann","email":"jthemann1@skyrock.com","gender":"Agender","age":29},
  {"id":3,"first_name":"Cece","last_name":"Carlet","email":"ccarlet2@jalbum.net","gender":"Male","age":69},
  {"id":4,"first_name":"Elton","last_name":"Allinson","email":"eallinson3@jugem.jp","gender":"Male","age":31},
  {"id":5,"first_name":"Garvy","last_name":"Shaddick","email":"gshaddick4@rediff.com","gender":"Male","age":32},
  {"id":6,"first_name":"Fin","last_name":"Realy","email":"frealy5@unc.edu","gender":"Male","age":26},
  {"id":7,"first_name":"Minnaminnie","last_name":"Fransseni","email":"mfransseni6@aboutads.info","gender":"Agender","age":52},
  {"id":8,"first_name":"Fernando","last_name":"Pagon","email":"fpagon7@blogs.com","gender":"Male","age":40},
  {"id":9,"first_name":"Tiphanie","last_name":"Fenny","email":"tfenny8@sakura.ne.jp","gender":"Female","age":52},
  {"id":10,"first_name":"Nerti","last_name":"Try","email":"ntry9@shareasale.com","gender":"Female","age":43},
  {"id":11,"first_name":"Abagael","last_name":"Beadell","email":"abeadella@unc.edu","gender":"Female","age":76},
  {"id":12,"first_name":"Morten","last_name":"McNamee","email":"mmcnameeb@sun.com","gender":"Male","age":38},
  {"id":13,"first_name":"Domenico","last_name":"Shearman","email":"dshearmanc@seesaa.net","gender":"Male","age":66}
];

const EmployeeList = ({ employees, addEmployee }) => {
  return (
    <div className="employee-list">
      <h3>Employees List</h3>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id} className={employee.added ? 'disabled' : ''}>
            {employee.first_name} {employee.last_name} - {employee.age} years
            {!employee.added && <button onClick={() => addEmployee(employee)}>ADD</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

const TeamList = ({ team, removeEmployee }) => {
  const totalAge = team.reduce((acc, curr) => acc + curr.age, 0);
  const averageAge = team.length > 0 ? Math.round(totalAge / team.length) : 0;

  const handleRemove = (employee) => {
    removeEmployee(employee);
  };

  return (
    <div className="team-list">
      <h3>Team Members</h3>
      <p>Average Age: {averageAge}</p>
      <ul>
        {team.map((employee) => (
          <li key={employee.id}>
            {employee.first_name} {employee.last_name} - {employee.age} years
            <button onClick={() => handleRemove(employee)}>REMOVE</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [allEmployees, setAllEmployees] = useState(employees);
  const [team, setTeam] = useState([]);

  const addEmployee = (employee) => {
    const updatedEmployees = allEmployees.map((emp) =>
      emp.id === employee.id ? { ...emp, added: true } : emp
    );
    setAllEmployees(updatedEmployees);
    setTeam([...team, employee]);
  };

  const removeEmployee = (employee) => {
    const updatedEmployees = allEmployees.map((emp) =>
      emp.id === employee.id ? { ...emp, added: false } : emp
    );
    setAllEmployees(updatedEmployees);
    setTeam(team.filter((emp) => emp.id !== employee.id));
  };

  const sortEmployeesByAge = () => {
    const sortedEmployees = [...team].sort((a, b) => a.age - b.age);
    setTeam(sortedEmployees);
  };

  return (
    <div className="app">
      <EmployeeList employees={allEmployees} addEmployee={addEmployee} />
      <TeamList team={team} removeEmployee={removeEmployee} />
      <button onClick={sortEmployeesByAge}>SORT BY AGE</button>
    </div>
  );
};

export default App;
