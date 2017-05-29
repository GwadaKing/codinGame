import java.util.*;
import java.io.*;
import java.math.*;

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
class Player {
    public static void main(String args[]) {
        Scanner in = new Scanner(System.in);
        //////////////////////////////////////////////////////////////////////// MES VARIABLES ////////////////////////////////////////////////////////////////
        int[] advX=new int[500];                                                                            // les positions X de l'adversaire
        int[] advY=new int[500];                                                                            // les positions Y de l'adversaire
        int[] moiX=new int[500];                                                                            // mes positions X
        int[] moiY=new int[500];                                                                            // mes positions Y
        int posX=0;                                                                                         // ma position X courante
        int posY=0;                                                                                         // ma position Y courante
        int tour=0;                                                                                         // les tours de jeu en général
        int tourMoi=0;                                                                                      // mes tours de jeu
        int tourAdv=0;                                                                                      // les tours de jeu de l'adversaire
        boolean lecture=false;                                                                              // 
        String direction="UP";
        
        // game loop
        while (true) {
            int N = in.nextInt();                                                                           // total number of players (2 to 4).
            int P = in.nextInt();
            for (int i = 0; i < N; i++) {
                int X0 = in.nextInt();                                                                      // starting X coordinate of lightcycle (or -1)
                int Y0 = in.nextInt();                                                                      // starting Y coordinate of lightcycle (or -1)
                int X1 = in.nextInt();                                                                      // starting X coordinate of lightcycle (can be the same as X0 if you play before this player)
                int Y1 = in.nextInt();                                                                      // starting Y coordinate of lightcycle (can be the same as Y0 if you play before this player)
                                                                                                            
                if ((i==P) && (lecture==false)) {                                                           // Si c'est notre tour, alors enregistrer notre position
                    posX=X1;
                    posY=Y1;
                    moiX[tourMoi]=X1;
                    moiY[tourMoi]=Y1;
                    tourMoi=tourMoi+1;
                }
                else if (i!=P) {                                                                            // sinon stocker la position de l'adversaire
                    advX[tourAdv]=X1;
                    advY[tourAdv]=Y1;
                    tourAdv=tourAdv+1;
                }
            }
            //////////////////////////////////////////////////////// GESTION DES DES LIMITES DE LA GRILLE ////////////////////////////////////////////////
            if ((posX==0) && (posY!=0)) {                                                                   // Si elle arrive au bord gauche, la rediriger
                if ((posY>=9) && (direction!="DOWN")) {
                   direction="UP"; 
                }
                else if ((posY<9) && (direction!="UP")) {                   
                   direction="DOWN"; 
                }
            } 
            else if ((posX==29) && (posY!=19)) {                                                            // Si elle arrive au bord droit, la rediriger
                if ((posY>=9) && (direction!="DOWN")) {
                   direction="UP"; 
                }
                else if ((posY<9) && (direction!="UP")) {
                   direction="DOWN"; 
                }
            }
            else if ((posY==0) && (posX!=0)) {                                                              // Si elle arrive au bord haut, la rediriger
                if ((posX>=14) && (direction!="RIGHT")) {
                   direction="LEFT"; 
                }
                else if ((posX<14) && (direction!="LEFT")) {
                   direction="RIGHT"; 
                }
            } 
            else if ((posY==19) && (posX!=29)) {                                                            // Si elle arrive au bord bas, la rediriger
                if ((posX>=14) && (direction!="RIGHT")) {
                   direction="LEFT"; 
                }
                else if ((posX<14) && (direction!="LEFT")) {
                   direction="RIGHT"; 
                }
            }
            else if ((posY==19) && (posX==29) && (direction!="LEFT")) {
                direction="LEFT";
            }
            else if ((posY==19) && (posX==0) && (direction!="RIGHT"))  {
                direction="RIGHT";
            }
            else if ((posY==0) && (posX==0) && (direction!="RIGHT"))  {
                direction="RIGHT";
            }
            else if ((posY==0) && (posX==29) && (direction!="LEFT"))  {
                direction="LEFT";
            }
            for (int j=0;j<advX.length;j++) {                                                               // On itère sur les tableaux position adversaire
                if (((advX[j]==posX+1) || (advX[j]==posX-1)) && ((advY[j]==posY+1) || (advY[j]==posY-1))) { // Si la case suivante est occupée par l'adversaire changer de position
                    if (((direction=="DOWN") || (direction=="UP")) && (posX<14)) {
                        direction="RIGHT";
                    }
                    else if (((direction=="DOWN") || (direction=="UP")) && (posX>=14)) {
                        direction="LEFT";
                    }
                    else if (((direction=="LEFT") || (direction=="RIGHT")) && (posY<9)) {
                        direction="DOWN";
                    }
                    else if (((direction=="LEFT") || (direction=="RIGHT")) && (posY>=9)) {
                        direction="UP";
                    }
                }
            }
            for (int k=0;k<moiX.length;k++) {                                                               // On itère sur les tableaux de notre position
                if (((moiX[k]==posX+1) || (moiX[k]==posX-1)) && ((moiY[k]==posY+1) || (moiY[k]==posY-1))) { // Si la case suivante est occupée par nous même changer de position
                    if (((direction=="DOWN") || (direction=="UP")) && (posX<14)) {
                        direction="RIGHT";
                    }
                    else if (((direction=="DOWN") || (direction=="UP")) && (posX>=14)) {
                        direction="LEFT";
                    }
                    else if (((direction=="LEFT") || (direction=="RIGHT")) && (posY<9)) {
                        direction="DOWN";
                    }
                    else if (((direction=="LEFT") || (direction=="RIGHT")) && (posY>=9)) {
                        direction="UP";
                    }
                }
            }
            //System.out.println(advX.get(0)+" "+advY.get(0));
            System.out.println(direction);                                                                  // la décision prise à chaque tour
            lecture=true;
            switch (direction) {                                                                            // on met à jour la position de notre bike
                case "DOWN" : posY=posY+1;
                break;
                case "UP" : posY=posY-1;
                break;
                case "RIGHT" : posX=posX+1;
                break;
                case "LEFT" : posX=posX-1;
                break;
                default : posY=posY-1;
            }
            tour=tour+1;                                                                                    // On met à jour le nombre de tours
        }
    }
}