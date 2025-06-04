import { useNavigate } from 'react-router-dom';
import { AnalysisHeader } from '../components/AnalysisHeader';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FFF4E6] text-[#000] min-h-screen">
      <AnalysisHeader />

      {/* Hero Section */}
      <section className="text-center px-4 mt-10">
        <h1 className="text-4xl md:text-6xl uppercase font-galindo mb-4">
          <span className="text-black">Who</span>{' '}
          <span className="text-black">is the A-Hole?</span>
        </h1>
        <p className="text-xl md:text-2xl uppercase font-bold mb-6">
          Let an AI judge your argument to help you understand what really happened
        </p>
        <div className="flex justify-center mb-6">
          <img src="https://raw.githubusercontent.com/atareh/WITA/main/man-hero-3.png" alt="Main hero yelling" className="w-full max-w-4xl" />
        </div>

        <div className="flex justify-center">
          <button 
            onClick={() => navigate('/analyze')}
            className="bg-[#0658D6] text-white px-6 py-3 rounded-lg text-base md:text-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            Analyze Conversation
            <img src='https://raw.githubusercontent.com/atareh/WITA/main/sparkle-vector.png' alt='sparkle' className='h-4 md:h-5' />
          </button>
        </div>
      </section>

      {/* WHAT IS THIS */}
      <section className="text-center px-4 mt-24 relative">
        <h2 className="text-4xl md:text-5xl uppercase font-galindo mb-2">What is this?</h2>
        <img src="https://raw.githubusercontent.com/atareh/WITA/main/red-underline-1.png" alt="Red underline" className="mx-auto mb-6 w-[300px] md:w-[400px]" />
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 px-6">
          <img src="https://raw.githubusercontent.com/atareh/WITA/main/judge-head.png" className="w-[250px] md:w-[350px]" alt="Judge" />
          <p className="text-base md:text-xl max-w-xl leading-snug font-bold">
            WITA is an AI judge for text arguments. It reads the emotional tone, context, and escalation to help you see how the conversation went off-track, and who was responsible for it.
          </p>
        </div>
      </section>

      {/* HOW DOES IT WORK */}
      <section className="text-center px-4 mt-24">
        <h2 className="text-4xl md:text-5xl uppercase font-galindo mb-2">How does it work?</h2>
        <img src="https://raw.githubusercontent.com/atareh/WITA/main/blue-underline-2.png" alt="Red underline" className="mx-auto mb-6 w-[300px] md:w-[400px]" />
        <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-10 px-6">
          <p className="text-base md:text-xl max-w-xl leading-snug font-bold">
            You upload a text convo. WITA breaks it down like a third-party observer, identifying:
            <br /><br />
            - Emotional spikes<br />
            - Escalation triggers<br />
            - Patterns of blame or withdrawal<br /><br />
            And yes, it gives a ruling: who was the a-hole.
          </p>
          <img src="https://raw.githubusercontent.com/atareh/WITA/main/woman-yelling-new.png" className="w-[250px] md:w-[350px]" alt="Woman yelling" />
        </div>
      </section>

      {/* WHY BUILD THIS */}
      <section className="text-center px-4 mt-24">
        <h2 className="text-4xl md:text-5xl uppercase font-galindo mb-2">Why build this?</h2>
        <img src="https://raw.githubusercontent.com/atareh/WITA/main/red-underline-3.png" alt="Red underline" className="mx-auto mb-6 w-[300px] md:w-[400px]" />
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 px-6">
          <img src="https://raw.githubusercontent.com/atareh/WITA/main/man-yelling-new.png" className="w-[250px] md:w-[350px]" alt="Man yelling" />
          <p className="text-base md:text-xl max-w-xl leading-snug font-bold">
            People argue. It's part of life. But most of the time, we don't learn from them.
            <br /><br />
            WITA gives you a clean, outside read. No bias, no heat. So you can understand what actually happened.
            <br /><br />
            (and tell you if you were the a-hole, or not)
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <div className="flex justify-center mt-10">
        <button 
          onClick={() => navigate('/analyze')}
          className="bg-[#0658D6] text-white px-6 py-3 rounded-lg text-base md:text-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          Analyze Conversation
          <img src='https://raw.githubusercontent.com/atareh/WITA/main/sparkle-vector.png' alt='sparkle' className='h-4 md:h-5' />
        </button>
      </div>
      <div className="flex justify-center mt-12">
        <img src="https://raw.githubusercontent.com/atareh/WITA/main/sitting%20prime.png" alt="Sitting Characters" className="w-[300px] md:w-[400px]" />
      </div>
      <footer className="text-xs text-black text-center py-6 px-6">
        2025 WITA<br />an AS experience
      </footer>
    </div>
  );
}