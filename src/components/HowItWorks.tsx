import * as motion from 'motion/react-client';
import { Card } from './ui/card';
import { Download, MessageSquareText, Sparkles } from 'lucide-react';

const steps = [
    {
      icon: <MessageSquareText className="h-6 w-6" />,
      title: "Describe Your Vision",
      description:
        "Enter a prompt describing your desired artwork and choose a color palette",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI Magic",
      description:
        "Our advanced AI transforms your prompt into stunning vector art",
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Download & Use",
      description: "Get your vector artwork, ready for any project in minutes and share with the world",
    },
  ];
const HowItWorks = () => {
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
          <h3 className="text-3xl font-bold mb-4 ">How It Works</h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Create stunning vector art in three simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="p-6 bg-white/10 border-foreground/20 hover:bg-white/20 transition-colors relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 text-9xl font-bold text-foreground/5 group-hover:text-foreground/10 transition-colors">
                  {index + 1}
                </div>
                <div className="h-12 w-12 rounded-lg text-white bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                <p className="text-gray-400 relative z-10">
                  {step.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
