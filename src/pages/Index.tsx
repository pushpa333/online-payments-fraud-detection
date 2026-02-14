import { Link } from "react-router-dom";
import { Shield, ArrowRight, Activity, Lock, Zap } from "lucide-react";
import bgHero from "@/assets/bg-hero.jpg";

const Home = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgHero})` }}
        />
        <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
            <Activity className="h-4 w-4 animate-pulse-glow" />
            ML-Powered Detection
          </div>

          <h1 className="mb-6 font-heading text-4xl font-bold leading-tight tracking-wide text-foreground text-glow md:text-6xl">
            Online Payments
            <br />
            <span className="text-primary">Fraud Detection</span>
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Predict online payment fraud using classification algorithms like
            Decision Tree, Random Forest, SVM, and Extra Tree Classifier.
          </p>

          <Link
            to="/predict"
            className="group inline-flex items-center gap-3 rounded-lg bg-primary px-8 py-4 font-heading text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all duration-300 hover:scale-105 glow-primary hover:brightness-110"
          >
            Start Prediction
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border/50 bg-card/50 py-24">
        <div className="container mx-auto grid max-w-4xl gap-8 px-6 md:grid-cols-3">
          {[
            { icon: Shield, title: "Accurate", desc: "High-precision ML models trained on real transaction data" },
            { icon: Zap, title: "Instant", desc: "Get fraud predictions in milliseconds" },
            { icon: Lock, title: "Secure", desc: "Your transaction data is never stored" },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-xl border border-border/50 bg-secondary/50 p-6 text-center transition-all duration-300 hover:border-primary/30 hover:glow-primary"
            >
              <Icon className="mx-auto mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
