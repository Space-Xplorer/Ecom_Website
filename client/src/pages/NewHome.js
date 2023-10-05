import React from "react";
import Layout from "../components/Layout/Layout";
import {motion} from 'framer-motion'
function NewHome() {
  return (
    <Layout title={"Artisans of Telangana - Raising Awareness"}>
      <div className="container mx-auto p-8">
        <section className="hero text-center">
          <h1 className="text-4xl font-semibold mb-4">
            Celebrating the Artisans of Telangana
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Discover the rich heritage and craftsmanship of Telangana artisans.
          </p>
          <img
            src="https://cdn.telanganatoday.com/wp-content/uploads/2022/08/On-handloom-day-visit-this-village-in-Telangana-to-witness-art-of-weaving.jpg"
            alt="Telangana Artisan"
            className="mx-auto rounded-lg shadow-lg"
          />
        </section>

        <section className="about-artisans my-12">
          <h2 className="text-3xl font-semibold mb-4 text-center">
            About Telangana Artisans
          </h2>
          <p className="text-lg text-gray-700">
            Telangana is a state in India that is known for its rich cultural
            heritage and traditions. Handloom weaving is one of the most
            important traditional crafts of Telangana, and the state is home to
            a large number of skilled handloom artisans. Telangana handloom
            artisans produce a wide variety of textiles, including sarees,
            dhotis, shawls, and other garments. The state is particularly famous
            for its Ikat textiles, which are woven using a tie-dye technique
            that produces intricate patterns. Other popular Telangana handloom
            fabrics include the Gadwal saree, the Narayanpet saree, and the
            Gollabhama saree. Telangana handloom artisans play an important role
            in the state's economy. The handloom industry provides employment to
            a large number of people, and it also helps to preserve the state's
            cultural heritage.
          </p>
        </section>

        <section className="artisan-showcase my-12">
          <h2 className="text-3xl font-semibold mb-4 text-center">
            Artisan Creations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div className="artisan-image lg:mt-10"
            
            
            >
              <img
                src="https://www.theweavesart.com/cdn/shop/files/PinwheelPatternPochampallyIkatSilkSaree_800x.png?v=1685524071"
                alt="Artisan Product 1"
                className="rounded-lg shadow-md"
              />
              <span className=" font-bold text-lg text-center">
                Pochampally Ikat
              </span>
              <p>
                <span className="font-bold">Pochampally Ikat</span> is a type of
                resist-dyeing technique that produces intricate patterns on
                textiles. Pochampally Ikat sarees are particularly famous for
                their beauty and craftsmanship.
              </p>
            </motion.div>
            <motion.div className="artisan-image"
            
            
            >
              <img
                src="https://azlqkobuum.cloudimg.io/v7/https://seerat.shop/wp-content/uploads/2021/03/Whitagram-Image-26-min-1.jpg"
                alt="Artisan Product 2"
                className="rounded-lg shadow-md"
              />
              <span className=" font-bold text-lg text-center">
                Gadwaal Sarees
              </span>
              <p>
                <span className="font-bold">Gadwal sarees</span> are known for
                their bright colors and intricate patterns. Gadwal sarees are
                often woven with silk or cotton, and they are often decorated
                with floral motifs.
              </p>
            </motion.div>
            <motion.div className="artisan-image lg:mt-48"
            
            
            >
              <img
                src="https://2.bp.blogspot.com/-Npu6yceQJTE/WdFpS2B1JwI/AAAAAAAAC2g/lAr8sH9a4OIYVccXQXID_o-H1vcSDNdYwCLcBGAs/s1600/gollabhama_sarees.jpg"
                alt="Artisan Product 3"
                className="rounded-lg shadow-md"
              />
              <span className=" font-bold text-lg text-center">
                Gollabhama Sarees
              </span>
              <p>
                <span className="font-bold">Gollabhama sarees</span> are known
                for their bold and colorful designs. Gollabhama sarees are often
                woven with cotton or silk, and they are often decorated with
                floral motifs.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default NewHome;
