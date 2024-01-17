import React, { useEffect, useState } from 'react'

const App = () => {
  const apiKey = '899yhyuiUOO908956145B7H';
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('http://localhost:8081/users', {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
    })
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div style={{ padding: '50px' }}>
      <p>The table below will read the ID, Name and Email from your users table in your mysql database</p>
      <table>
        <thead>
          <th>ID</th>
          <th>NAME</th>
          <th>EMAIL</th>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App