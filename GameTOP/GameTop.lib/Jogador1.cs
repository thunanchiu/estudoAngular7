using GameTOP.Interface;
using System;

namespace GameTop.lib
{
    public class Jogador1 : IJogador
    {
       public readonly string Nome;

        public Jogador1(string nome){
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