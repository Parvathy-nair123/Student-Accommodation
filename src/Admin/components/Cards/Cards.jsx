import React, { useEffect, useState } from "react";
import "./Cards.css";
import {
  UilClipboardAlt,
} from "@iconscout/react-unicons";
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";

import Card from "../Card/Card";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../config/firebase";

const Cards = () => {

  const [user,setUser] = useState();
  const [landlord,setLandlord] = useState();
  const [property,setProperty] = useState();



  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {

    const propertyCountQuerySnapshot = await getDocs(query(collection(db, "properties")));
    setProperty(propertyCountQuerySnapshot.docs.length );

    const usreCountQuerySnapshot = await getDocs(query(collection(db, "users")));
    setUser(usreCountQuerySnapshot.docs.length );

    const landlordCountQuerySnapshot = await getDocs(query(collection(db, "landlords")));
    setLandlord(landlordCountQuerySnapshot.docs.length );
  }

  const cardsData = [
    {
      title: "Users",
      color: {
        backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      barValue: 70,
      value: user,
      png: UilUsdSquare,
      series: [
        {
          name: "Users",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
      ],
    },
    {
      title: "Landlords",
      color: {
        backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
        boxShadow: "0px 10px 20px 0px #FDC0C7",
      },
      barValue: 80,
      value: landlord,
      png: UilMoneyWithdrawal,
      series: [
        {
          name: "Landlords",
          data: [10, 100, 50, 70, 80, 30, 40],
        },
      ],
    },
    {
      title: "Properties",
      color: {
        backGround:
          "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
        boxShadow: "0px 10px 20px 0px #F9D59B",
      },
      barValue: 60,
      value: property,
      png: UilClipboardAlt,
      series: [
        {
          name: "Properties",
          data: [10, 25, 15, 30, 12, 15, 20],
        },
      ],
    },
  ]
  return (
    <div className="Cards">
      {cardsData.map((card, id) => {
        return (
          <div className="parentContainer" key={id}>
            <Card
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              series={card.series}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
