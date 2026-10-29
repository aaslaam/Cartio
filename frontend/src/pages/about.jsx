import React from "react";

import Title from "../components/title";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="flex flex-col md:flex-row gap-16 my-10">
        <img
          src={assets.about_img}
          alt=""
          className="w-full md:max-w-[450px]"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-700">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id,
            adipisci! Harum unde possimus non tenetur a magni quasi dolor ea
            quaerat eos expedita accusamus porro odio, quam cumque ducimus
            dicta. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Dignissimos, eum. Totam, ducimus recusandae eius aut expedita alias
            odio vitae eligendi iste, provident molestias perspiciatis quidem
            magni ex obcaecati sint quo.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus,
            repellendus? Modi optio fuga, natus exercitationem voluptates quo
            vero impedit expedita, cupiditate velit unde beatae perferendis
            similique veritatis obcaecati? Magnam, vitae!. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Accusantium exercitationem eius
            culpa consectetur provident impedit obcaecati tempora fugit aperiam
            nihil fuga harum cumque maiores, dignissimos a reprehenderit maxime
            architecto sunt!
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet
            nostrum facilis placeat odio deserunt eius, at error, libero,
            obcaecati voluptatem fugit fuga ipsum cum distinctio voluptate
            assumenda sunt accusantium tenetur?. Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Accusantium quas molestiae temporibus
            itaque quod culpa nostrum nihil sint error repudiandae ut ex commodi
            atque laboriosam earum quae, adipisci ad optio.
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 mb-20">
        <div className="border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>
        <div className="border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>
        <div className="border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Our team of dedicated professionals is here to assist you the way,
            ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
