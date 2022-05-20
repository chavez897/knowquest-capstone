import React from "react";
import { HomeIntro } from "../ui/HomeIntro";
import { Card } from "../ui/Card";
import { Announcenment } from "../ui/Announcement";
import { IndexSignUp } from "../ui/IndexSignUp";
import { Importance } from "../ui/Importance";

export const HomeScreen = () => {
  const cardsInfo = [
    {
      id: 1,
      src: "https://knowquest.net/images/books-stack-of-three.png",
      href:"#",
      title: "Rate your textbook",
      description:
        "Use your Textbook’s ISBN number to Anonymously Rate Your Textbook! Your ratings will help improve textbooks.",
    },
    {
      id: 2,
      src: "https://knowquest.net/images/university.png",
      href:"#",
      title: "Rate your school",
      description:
        "Rate your school every semester! It takes less than a minute and helps your school improve its value to students.",
    },
    {
      id: 3,
      src: "https://knowquest.net/images/presentation.png",
      href:"#",
      title: "Rate your class",
      description:
        "Rate each class, every semester. Your ratings will help your school and professors to improve classes. Make your voice heard!",
    },
    {
      id: 4,
      src: "https://knowquest.net/images/management.png",
      href:"#",
      title: "Rate your resource",
      description:
        "Rate each class, every semester. Your ratings will help your school and professors to improve classes. Make your voice heard!",
    },
    {
      id: 5,
      src: "https://knowquest.net/images/online-course.png",
      href:"#",
      title: "Rate your online learning",
      description:
        "Online learning is the new normal in many places. Make sure your school knows how they are doing!",
    },
  ];
  return (
    <div className="container-fluid">
      <HomeIntro />
      <IndexSignUp />
      <div className="container py-5">
        <div className="row">
          {cardsInfo.map((card) => (
            <div key={card.id} className="col-lg-4 py-2">
              <Card src={card.src} href={card.href} title={card.title} description={card.description} />
            </div>
          ))}
        </div>
      </div>
      <Announcenment />
      <Importance />
    </div>
  );
};
