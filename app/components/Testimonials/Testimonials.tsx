import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Kenzie Edgar",
    img: "https://i.pravatar.cc/100?gender=female",
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos sunt ratione dolor exercitationem minima quas itaque saepe quasi architecto vel! Accusantium, vero sint recusandae cum tempora nemo commodi soluta deleniti.",
  },
  {
    id: 2,
    name: "Stevie Tifft",
    img: "https://i.pravatar.cc/100?gender=male",
    quote:
      "Lorem ipsum, dolor sit amet, consectetur adipisicing elit. Dolore quod necessitatibus, labore sapiente, est, dignissimos ullam error ipsam sint quam tempora vel.",
  },
  {
    id: 3,
    name: "Tommie Ewart",
    img: "https://i.pravatar.cc/100?gender=female",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae, obcaecati ullam excepturi dicta error deleniti sequi.",
  },
  {
    id: 4,
    name: "Charlie Howse",
    img: "https://i.pravatar.cc/100?gender=male",
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto inventore voluptatum nostrum atque, corrupti, vitae esse id accusamus dignissimos neque reprehenderit natus, hic sequi itaque dicta nisi voluptatem! Culpa, iusto.",
  },
  {
    id: 5,
    name: "Nevada Herbertson",
    img: "https://i.pravatar.cc/100?gender=female",
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, voluptatem porro obcaecati dicta, quibusdam sunt ipsum, laboriosam nostrum facere exercitationem pariatur deserunt tempora molestiae assumenda nesciunt alias eius? Illo, autem!",
  },
  {
    id: 6,
    name: "Kris Stanton",
    img: "https://i.pravatar.cc/100?gender=male",
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem iusto, explicabo, cupiditate quas totam!",
  },
];

const Testimonials: React.FC = () => {
  return (
    <div className="min-w-screen min-h-screen bg-gray-50 flex items-center justify-center py-5">
      <div className="w-full bg-white border-t border-b border-gray-200 px-5 py-16 md:py-24 text-gray-800">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold mb-5 text-gray-600">
              What people <br /> are saying.
            </h1>
            <h3 className="text-xl mb-5 font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h3>
            <div className="text-center mb-10">
              <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
              <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
              <span className="inline-block w-40 h-1 rounded-full bg-indigo-500"></span>
              <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
              <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full md:w-1/3 px-3 mb-6">
                <div className="bg-white border border-gray-200 p-5 rounded-lg text-gray-800 font-light">
                  <div className="flex items-center mb-4">
                    <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                      {/* Use <img> tag instead of <Image> */}
                      <img src={testimonial.img} alt={testimonial.name} width={40} height={40} />
                    </div>
                    <div className="flex-grow pl-3">
                      <h6 className="font-bold text-sm uppercase text-gray-600">{testimonial.name}</h6>
                    </div>
                  </div>
                  <p className="text-sm leading-tight italic">
                    <span className="text-lg font-bold text-gray-400 mr-1">&quot</span>
                    {testimonial.quote}
                    <span className="text-lg font-bold text-gray-400 ml-1">&quot</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
