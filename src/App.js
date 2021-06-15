
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TableCell, TableBody, TableRow, TableContainer, Table, TableHead, Paper, CardMedia } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';

function App() {

  const classes = useStyles();
  const [data, setData] = useState();
  const [headings, setheading] = useState();
  const [total_pages, settotal_pages] = useState();
  const [page, setpage] = useState(1);
  useEffect(() => {
    getPageData(1);

  }, []);
  const getPageData = (value) => {
    axios.get('https://reqres.in/api/users?page=' + value)
      .then(response => {
        setData(response.data.data);
        // console.log(response.data);
        settotal_pages(response.data.total_pages);
        setheading(Object.keys(response.data.data[0]));
        // console.log(Object.keys(response.data.data[0]));
      });
  }
  const handleChange = (event, value) => {
    event.preventDefault();
    setpage(value);
    getPageData(value);
  }
  return (
    <div >
      <h1 style={{marginLeft:"39rem"}}>Users Data</h1>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {headings && headings.map(heading =>

                <TableCell >{heading}</TableCell>

              )
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.map((row) => (
              <TableRow key={row.name}>
                <TableCell>
                  {row.id}
                </TableCell>
                <TableCell >{row.email}</TableCell>
                <TableCell >{row.first_name}</TableCell>
                <TableCell >{row.last_name}</TableCell>
                <TableCell ><CardMedia
                  style={{
                    height: "2rem",
                    paddingTop: "3rem",
                    width: "6rem"
                  }}
                  image={row.avatar}
                /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginLeft:"40rem", marginTop: "1rem" }}>
        <Pagination s count={total_pages} page={page} onChange={handleChange} />
      </div>
    </div>
  );
}

export default App;
