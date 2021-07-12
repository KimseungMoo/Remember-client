import React, { useEffect } from "react";
import "./About5.css";

const About5 = () => {
  useEffect(() => {
    window.AOS.init();
  });

  return (
    <section id="about">
      <div
        className="about__left"
        data-aos="fade-up"
        data-aos-once="false"
        data-aos-delay="100"
        data-aos-duration="1500"
      >
        <img src="images/about5.png" alt="" />
      </div>
      <div className="about__right">
        <div
          className="about__text"
          data-aos="zoom-in"
          data-aos-delay="100"
          data-aos-duration="1000"
        >
          <h1>기억하셨다면 다른 사람에게도 공유를 통해 기억하게 해주세요.</h1>
          <p>
            우리는 잊혀진 사건과 사고들을 사람들에게 알리고자 합니다. <br></br>
            또한, 사건의 희생자들을 돕기 위해 후원금을 모아서 지원하는 활동을
            하고 있습니다.
          </p>
          <h2>당신의 도움과 관심을 희망합니다!</h2>
          <h3>----Remember----</h3>
        </div>
      </div>
    </section>
  );
};

export default About5;