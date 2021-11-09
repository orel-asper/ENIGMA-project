import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", (data) => {
      console.log(`data`, data);
      setResponse(data);
    });
  }, []);

  const style = { border: "1px solid #000000" };

  return (
    <p>
      <h2>BTC-USD</h2>
      {response.bids ? (
        <table style={style}>
          <tr>
            <th>bid qty</th>
            <th>bid price</th>
            <th>ask qty</th>
            <th>ask price</th>
          </tr>
          {response.bids.map((b, i) => {
            if (i <= 5) {
              return (
                <tr>
                  <td style={style}>{response.bids[i][1]}</td>
                  <td style={style}>{response.bids[i][0]}</td>
                  <td style={style}>{response.asks[i][1]}</td>
                  <td style={style}>{response.asks[i][0]}</td>
                </tr>
              );
            }
          })}
        </table>
      ) : null}
    </p>
  );
}

export default App;
