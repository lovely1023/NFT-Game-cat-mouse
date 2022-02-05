import {useEffect, useState} from "react";
import moment from "moment"
import LandingPage from "../LandingPage";

// UTC
//const targetTime = moment("2021-12-27T00:00:00Z");
const targetTime = moment("2021-12-23T00:00:00Z");

export const CountdownPage = () => {
  const [currentTime, setCurrentTime] = useState(moment().utc());
  const timeBetween = moment.duration(targetTime.diff(currentTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return !targetTime.isSameOrAfter(moment().utc()) ?
    (
      <LandingPage/>
    )
    : (
      <div style={{height: "100vh"}}>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
          fontSize: 32
        }}>
          <p>WHITELIST SALE STARTS IN</p>
          <p style={{
            fontSize: 48,
            color: '#ffa700',
          }}>
            <span>{timeBetween.days()}d </span>
            <span>{timeBetween.hours()}h </span>
            <span>{timeBetween.minutes()}min </span>
            <span>{timeBetween.seconds()}s </span>
          </p>
        </div>
      </div>
    );
};

export default CountdownPage;
