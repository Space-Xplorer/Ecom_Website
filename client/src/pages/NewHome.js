import React from "react";
import Layout from "../components/Layout/Layout";
import { motion } from "framer-motion";

function NewHome() {
  return (
    <Layout title={"Artisans of Telangana - Raising Awareness"}>
      <div className="container mx-auto p-8 bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl shadow-xl">
        
        {/* Hero Section */}
        <section className="hero text-center py-12">
          <motion.h1
            className="text-5xl font-extrabold text-orange-700 mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Celebrating the Artisans of Telangana
          </motion.h1>
          <motion.p
            className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Discover the rich heritage and craftsmanship of Telangana artisans.
          </motion.p>
          
          {/* Full-Width Background Image */}
          <motion.div
            className="mx-auto w-full h-80 md:h-96 lg:h-112 xl:h-128 rounded-lg shadow-lg bg-cover bg-center"
            style={{
              backgroundImage: `url("https://www.greavesindia.com/wp-content/uploads/2023/04/800-x-465-Crafts-in-Andhra-Pradesh-Wooden-toys-PRABHAS-ROY-Shutterstock_1721499955-2.jpg")`,
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          ></motion.div>
        </section>

        {/* About Section */}
        <section className="about-artisans my-16 bg-white bg-opacity-80 p-10 rounded-lg shadow-md">
          <motion.h2
            className="text-3xl font-semibold text-orange-700 mb-6 text-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            About Telangana Artisans
          </motion.h2>
          <motion.p
            className="text-lg text-gray-800 leading-relaxed"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Telangana is a state in India known for its rich cultural heritage
            and traditions. Handloom weaving is one of the most important
            traditional crafts of Telangana, and the state is home to many
            skilled handloom artisans. Telangana handloom artisans produce a
            wide variety of textiles, including sarees, dhotis, shawls, and
            other garments. The state is famous for its Ikat textiles, which
            feature intricate patterns created using a tie-dye technique. Other
            popular handloom fabrics include the Gadwal saree, Narayanpet saree,
            and Gollabhama saree. Telangana handloom artisans play an important
            role in the state's economy by providing employment and preserving
            the state's cultural heritage.
          </motion.p>
        </section>

        {/* Artisan Showcase Section */}
        <section className="artisan-showcase my-16">
          <motion.h2
            className="text-3xl font-semibold text-orange-700 mb-10 text-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Artisan Creations
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            
            {/* Pochampally Ikat */}
            <motion.div
              className="artisan-image p-6 bg-white bg-opacity-80 rounded-lg shadow-lg flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <img
                src="https://www.theweavesart.com/cdn/shop/files/PinwheelPatternPochampallyIkatSilkSaree_800x.png?v=1685524071"
                alt="Pochampally Ikat"
                className="rounded-lg shadow-md mb-4"
              />
              <h3 className="font-bold text-lg text-center text-gray-800 mb-2">
                Pochampally Ikat
              </h3>
              <p className="text-gray-700 text-center">
                <span className="font-bold">Pochampally Ikat</span> is a
                resist-dyeing technique that produces intricate patterns on
                textiles. These sarees are celebrated for their beauty and
                craftsmanship.
              </p>
            </motion.div>

            {/* Gadwal Sarees */}
            <motion.div
              className="artisan-image p-6 bg-white bg-opacity-80 rounded-lg shadow-lg flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <img
                src="https://azlqkobuum.cloudimg.io/v7/https://seerat.shop/wp-content/uploads/2021/03/Whitagram-Image-26-min-1.jpg"
                alt="Gadwal Sarees"
                className="rounded-lg shadow-md mb-4"
              />
              <h3 className="font-bold text-lg text-center text-gray-800 mb-2">
                Gadwal Sarees
              </h3>
              <p className="text-gray-700 text-center">
                <span className="font-bold">Gadwal sarees</span> are known for
                their bright colors and intricate patterns, woven with silk or
                cotton and often decorated with floral motifs.
              </p>
            </motion.div>

            {/* Gollabhama Sarees */}
            <motion.div
              className="artisan-image p-6 bg-white bg-opacity-80 rounded-lg shadow-lg flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <img
                src="https://2.bp.blogspot.com/-Npu6yceQJTE/WdFpS2B1JwI/AAAAAAAAC2g/lAr8sH9a4OIYVccXQXID_o-H1vcSDNdYwCLcBGAs/s1600/gollabhama_sarees.jpg"
                alt="Gollabhama Sarees"
                className="rounded-lg shadow-md mb-4"
              />
              <h3 className="font-bold text-lg text-center text-gray-800 mb-2">
                Gollabhama Sarees
              </h3>
              <p className="text-gray-700 text-center">
                <span className="font-bold">Gollabhama sarees</span> feature
                bold, colorful designs and are woven with cotton or silk,
                adorned with floral motifs.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default NewHome;