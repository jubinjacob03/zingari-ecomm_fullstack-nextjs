import React from "react";

export default function About() {
  return (
    <div className="mt-14 mx-4 md:mt-4 md:mx-auto">
      <img
        class="w-full object-cover rounded-xl"
        src="/about-description.png"
        alt="Image Description"
      />
      <div class="md:max-w-[68rem] px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
        <div class="md:max-w-[68rem]">
          <div class="flex justify-between items-center mb-6">
            <div class="flex flex-col md:flex-row w-full sm:items-center gap-x-5 sm:gap-x-3">
              <div class="flex justify-center flex-shrink-0">
                <img
                  class="h-56 w-56 rounded-full"
                  src="/logo.png"
                  alt="Image Description"
                />
              </div>

              <div class="grow">
                <div class="flex justify-between items-center gap-x-2">
                  <div>
                    <div class="inline-block">
                      <div class=" sm:mb-1 block text-start cursor-pointer">
                        <span class="font-semibold text-gray-800 text-2xl">
                          Z<span className="text-primary">in</span>gar<span className="text-primary">i</span>
                        </span>
                      </div>
                    </div>

                    <ul class="text-xs text-gray-500">
                      <li class="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full">
                        Fashion Brand
                      </li>
                      <li class="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full">
                        EST. 2024
                      </li>
                    </ul>
                  </div>

                  <div>
                    <button
                      type="button"
                      class="py-1.5 px-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                      onClick={() => { window.location.href = 'https://www.instagram.com/direct/t/_zingari/'; }}
                    >
                      <svg
                        fill="#000000"
                        height="15px"
                        width="15px"
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                          fill="#0F0F0F"
                        ></path>{" "}
                        <path
                          d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                          fill="#0F0F0F"
                        ></path>{" "}
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                          fill="#0F0F0F"
                        ></path>
                      </svg>
                      DM
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-5 md:space-y-8">
            <div class="space-y-3">
              <h2 class="text-2xl font-bold md:text-3xl mb-8">Our Story</h2>

              <p class="text-lg text-gray-800">
                Zingari is not just a clothing brand, but a lifestyle that
                embodies confidence, style, and individuality. Our journey began
                with a vision to redefine the fashion industry by offering
                unique, high-quality pieces that empower our customers to
                express themselves authentically. Let&apos;s delve into what
                sets Zingari apart in the competitive world of fashion.
              </p>
            </div>
            <div class="space-y-3">
              <p class="text-lg text-gray-800">
                At Zingari we pride ourselves on our rich heritage of
                craftsmanship and innovation. Every piece in our collection is
                meticulously designed and curated to reflect the diverse tastes
                and preferences of our global audience. From luxurious fabrics
                to avant-garde silhouettes, each garment tells a story of
                passion and dedication to our craft.
              </p>
            </div>

            <p class="text-lg text-gray-800">
              Our mission is simple yet profound - to empower individuals to
              embrace their uniqueness and stand out in a crowd. We believe that
              fashion is not just about clothing, but a form of self-expression
              and empowerment. Through our collections, we strive to inspire
              confidence, creativity, and authenticity in every person who wears
              our creations.
              <br />
              &apos;&apos;Be
              <span class="text-blue-600 decoration-2 hover:underline font-medium">
                &nbsp;bold
              </span>
              , be
              <span class="text-blue-600 decoration-2 hover:underline font-medium">
                &nbsp;fearless
              </span>
              , be
              <span class="text-blue-600 decoration-2 hover:underline font-medium">
                &nbsp;Zingari
              </span>
              .&apos;&apos;
            </p>

            <ul class="list-disc list-outside space-y-5 ps-5 text-lg text-gray-800">
              <li class="ps-2">
                Embracing Diversity: We believe in celebrating individuality and
                diversity through our inclusive designs that cater to all body
                types and style preferences.
              </li>
              <li class="ps-2">
                Sustainable Practices: Zingari is committed to sustainable and
                ethical fashion practices, ensuring that our impact on the
                planet is minimal while prioritizing the well-being of our
                artisans and workers.
              </li>
              <li class="ps-2">
                Constant Innovation: Our team of designers and creatives are
                always at the forefront of fashion trends, continuously pushing
                boundaries and redefining what it means to be stylish and
                confident.
              </li>
            </ul>

            <blockquote class="text-center p-4 sm:px-7">
              <p class="text-xl font-medium text-gray-800 md:text-2xl md:leading-normal xl:text-2xl xl:leading-normal">
              &quot; Style is a way to say who you are without having to speak.&quot;
              </p>
              <p class="mt-5 text-gray-800">— Rachel Zoe</p>
            </blockquote>

            <figure>
              <img
                class="w-full object-cover rounded-xl"
                src="/about-banner.png"
                alt="Image Description"
              />
            </figure>

            <h3 class="text-2xl font-semibold">Conclusion</h3>
            <p class="text-lg text-gray-800">
              As you explore the world of Zingari, we invite you to embark on a
              journey of self-discovery and empowerment through fashion. Join us
              in celebrating individuality, sustainability, and innovation as we
              continue to pave the way for a more confident and stylish future.
              Discover your unique style with Zingari and let your true self
              shine through.
            </p>
            <div>
              <span class="m-1 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer">
                #zingari
              </span>
              <span class="m-1 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer">
                #trending
              </span>
              <span class="m-1 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer">
                #beboldbefearlessbezingari
              </span>
              <span class="m-1 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer">
                @zingari
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
