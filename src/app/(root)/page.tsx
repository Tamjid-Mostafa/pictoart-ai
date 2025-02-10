import * as motion from "motion/react-client";
import Image from "next/image";
import { 
  Wand2, 
  Sparkles, 
  Palette, 
  MessageSquareText, 
  Download, 
  ChevronRight,
  Star,
  ArrowRight,
  Check,
  Github,
  Twitter,
  Instagram,
  CreditCard,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { getAllPosts } from "@/lib/actions/post.action";
import Hero from "@/components/Hero";

const steps = [
  {
    icon: <MessageSquareText className="h-6 w-6" />,
    title: "Describe Your Vision",
    description: "Enter a prompt describing your desired artwork and choose a color palette"
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "AI Magic",
    description: "Our advanced AI transforms your prompt into stunning vector art"
  },
  {
    icon: <Download className="h-6 w-6" />,
    title: "Download & Use",
    description: "Get your artwork in vector format, ready for any project"
  }
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "UI/UX Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    quote: "PictoArt AI has become my go-to tool for creating unique vector illustrations. The credit system is so flexible!"
  },
  {
    name: "Michael Rodriguez",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    quote: "The quality of artwork is consistently amazing. It's like having a professional illustrator on demand."
  },
  {
    name: "Emma Thompson",
    role: "Brand Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    quote: "Fast, efficient, and incredibly cost-effective. PictoArt AI has transformed our design workflow."
  }
];

const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    credits: 3,
    description: "Perfect for trying out PictoArt AI",
    features: [
      "3 free credits on sign-up",
      "Standard resolution exports",
      // "Basic color palette options",
      // "Community support"
    ]
  },
  {
    name: "Basic",
    price: "$9.99",
    credits: 20,
    description: "Great for individual creators",
    features: [
      "20 credits",
      "HD resolution exports",
      // "Advanced color controls",
      // "Priority support",
      // "Credit rollover (30 days)"
    ],
    popular: true
  },
  {
    name: "Pro",
    price: "$19.99",
    credits: 50,
    description: "Ideal for professionals",
    features: [
      "50 credits",
      "HD resolution exports",
      // "Custom color palettes",
      // "Priority support",
      // "Credit rollover (90 days)",
      // "API access"
    ]
  }
];

export default async function Home() {
  const posts = await getAllPosts();
  return (
    <div className="min-h-screen bg-gradient-to-b dark:from-slate-950 dark:to-indigo-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/20 blur-3xl blob-spin" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-500/20 blur-3xl blob" />
        <div className="absolute -bottom-40 left-1/3 w-72 h-72 bg-pink-500/20 blur-3xl blob-spin" />
      </div>

      {/* Hero Section */}
    <Hero />

      {/* How It Works */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold mb-4">How It Works</h3>
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
                <Card className="p-6 bg-white/10 border-white/20 hover:bg-white/20 transition-colors relative overflow-hidden group">
                  <div className="absolute -right-4 -top-4 text-9xl font-bold text-white/5 group-hover:text-white/10 transition-colors">
                    {index + 1}
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                  <p className="text-gray-400 relative z-10">{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold mb-4">
              AI-Generated Masterpieces
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Real examples created by our users with simple prompts
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {posts.map((art:Post, index:number) => (
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
                    <Button variant="secondary" size="sm" className="mt-2">
                      Try This Style
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold mb-4">
              Simple Credit-Based Pricing
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              1 Credit = 1 High-Quality Vector Illustration
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className={`p-6 ${plan.popular ? 'bg-gradient-to-b from-blue-600/20 to-purple-600/20 border-blue-500/50' : 'bg-white/10 border-white/20'}`}>
                  {plan.popular && (
                    <span className="px-3 py-1 text-sm bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 inline-block">
                      Most Popular
                    </span>
                  )}
                  <h4 className="text-2xl font-bold mb-2">{plan.name}</h4>
                  <div className="mb-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="h-4 w-4 text-purple-400" />
                    <span className="text-lg text-purple-400">{plan.credits} Credits</span>
                  </div>
                  <p className="text-gray-400 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-green-400" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {plan.price === "Free" ? "Start Free Trial" : "Buy Credits"}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold mb-4">
              Loved by Creatives
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join thousands of satisfied users who trust PictoArt AI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="p-6 bg-white/10 border-white/20">
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300">{testimonial.quote}</p>
                  <div className="flex gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h3 className="text-3xl font-bold mb-4">
              Turn Your Ideas into Art
            </h3>
            <p className="text-gray-300 mb-8">
              Start with 3 free credits and experience the future of vector art creation
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Start Creating for Free
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}