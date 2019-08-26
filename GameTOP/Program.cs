using System;

namespace EstudoConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            var jogo = new JogoFODA(new Jogador1("Ronaldo"), new Jogador2("Carlos"));            

            jogo.IniciarJogo();
        }
    }    

    


}
