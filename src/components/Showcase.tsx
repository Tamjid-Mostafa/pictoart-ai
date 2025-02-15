"use client";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useImageGeneratorStore } from "../store/image-generator";

const Showcase = ({ posts }: { posts: Post[] | undefined }) => {
  const router = useRouter();
  const { setPrompt, setPalette } = useImageGeneratorStore();

  const handleTryStyle = (art: Post) => {
    setPrompt(art.prompt);
    setPalette(art.palette);
    router.push("/start");
  };
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl font-bold mb-4">AI-Generated Masterpieces</h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real examples created by our users with simple prompts
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {posts?.map((art: Post, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative aspect-square rounded-lg overflow-hidden group"
            >
              <Image
                src={art.photo}
                alt="Showcase artwork"
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                  <p className="text-sm text-gray-200 mb-2">Prompt:</p>
                  <p className="text-sm font-medium">{art.prompt}</p>
                  <Button
                    onClick={() => handleTryStyle(art)}
                    variant="secondary"
                    size="sm"
                    className="mt-2"
                  >
                    Try This Style
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;
