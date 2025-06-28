import SocialIcons from './SocialIcons';
import Game from './Game';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-[url('https://images-rsg.storage.googleapis.com/wp-content/uploads/2023/10/Mystical-Landscape-Game-Background-by-Gaming-Backgrounds-Art-Outsourcing.jpg')] overflow-hidden m-0">
      <header className="bg-[#0d0d0d] w-full text-center py-5 border-b border-[#0d0d0d] fixed top-0 z-10">
        <div className="header__title mx-auto px-4">
          <h1 className="text-4xl font-bold text-white tracking-wide">FLAPPY BIRD</h1>
          <p className="mt-2 text-lg text-[#fcfcfc] italic">By Jesu Khamrui</p>
        </div>
      </header>
      <SocialIcons />
      <main className="flex justify-center items-center pt-24">
        <Game />
      </main>
    </div>
  );
}

export default App;