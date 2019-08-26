using GameTOP.Interface;
using System;

namespace GameTOP
{
    class JogoFODA{
        private readonly IJogador iJogador1;
        private readonly IJogador iJogador2;
        public JogoFODA(IJogador IJogador1,IJogador IJogador2){
            this.iJogador1 = IJogador1;
            this.iJogador2 = IJogador2;
        }
        public void IniciarJogo(){
            System.Console.Write(iJogador1.Corre());            
            System.Console.Write(iJogador1.Chuta());
            System.Console.Write(iJogador1.Passe());
            System.Console.Write("\n PRÓXIMO JOGADOR \n");
            System.Console.Write(iJogador2.Corre());            
            System.Console.Write(iJogador2.Chuta());
            System.Console.Write(iJogador2.Passe());
        }
    }
}