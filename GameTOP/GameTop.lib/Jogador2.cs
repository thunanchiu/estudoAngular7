using GameTOP.Interface;

namespace GameTop.lib
{
    public class Jogador2 : IJogador
    {
        public readonly string Nome;

        public Jogador2(string nome){
            Nome = nome;
        }

        public string Chuta(){
            return ($"{Nome} Chutou \n");
        }

        public string Corre(){
            return ($"{Nome} Correu \n");
        }

        public string Passe(){
            return ($"{Nome} Tocou a bola. \n");
        }
    }
}