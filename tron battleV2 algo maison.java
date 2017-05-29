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
        String direction="RIGHT";
        // game loop
        while (true) {
            int N = in.nextInt();                                                                           // total number of players (2 to 4).
            int P = in.nextInt();
            for (int i = 0; i < N; i++) {
                int X0 = in.nextInt();                                                                      // starting X coordinate of lightcycle (or -1)
                int Y0 = in.nextInt();                                                                      // starting Y coordinate of lightcycle (or -1)
                int X1 = in.nextInt();                                                                      // starting X coordinate of lightcycle (can be the same as X0 if you play before this player)
                int Y1 = in.nextInt();                                                                      // starting Y coordinate of lightcycle (can be the same as Y0 if you play before this player)
                                                                                                            
                if (i==P) {                                                                                 // Si c'est notre tour, alors enregistrer notre position
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
            //////////////////////////////////////////////////////////////// MOTEUR DE DECISIONS /////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////// Gestion des bords et coins de la map /////////////////////////////////////////////////
            
            if (direction.equals("UP")) {
                for (int j=0;j<moiY.length;j++) {
                    if (((advY[j]==posY-1)&&(advX[j]==posX))||((moiY[j]==posY-1)&&(moiX[j]==posX))||(posY==0)) {
                        if (((advX[j]==posX-1)&&(advY[j]==posY))||((moiX[j]==posX-1)&&(moiY[j]==posY))||(posX==0)) {
                            direction="RIGHT";
                        }
                        else if (((advX[j]!=posX-1)||(advY[j]!=posY))&&((moiX[j]!=posX-1)||(moiY[j]!=posY))&&(posX!=0)) {
                            direction="LEFT";
                        }
                        if (((advX[j]==posX+1)&&(advY[j]==posY))||((moiX[j]==posX+1)&&(moiY[j]==posY))||(posX==29)) {
                            direction="LEFT";
                        }
                        else if (((advX[j]!=posX+1)||(advY[j]!=posY))&&((moiX[j]!=posX+1)||(moiY[j]!=posY))&&(posX!=29)) {
                            direction="RIGHT";
                        }
                    }
                }
            }
            if (direction.equals("RIGHT")) {
                for (int k=0;k<moiY.length;k++) {
                    if (((advX[k]==posX+1)&&(advY[k]==posY))||((moiX[k]==posX+1)&&(moiY[k]==posY))||(posX==29)) {
                        if (((advY[k]==posY-1)&&(advX[k]==posX))||((moiY[k]==posY-1)&&(moiX[k]==posX))||(posY==0)) {
                            direction="DOWN";
                        }
                        else if (((advY[k]!=posY-1)||(advX[k]!=posX))&&((moiY[k]!=posY-1)||(moiX[k]!=posX))&&(posY!=0)) {
                            direction="UP";
                        }
                        if (((advY[k]==posY+1)&&(advX[k]==posX))||((moiY[k]==posY+1)&&(moiX[k]==posX))||(posY==19)) {
                            direction="UP";
                        }
                        else if (((advY[k]!=posY+1)||(advX[k]!=posX))&&((moiY[k]!=posY+1)||(moiX[k]!=posX))&&(posY!=19)) {
                            direction="DOWN";
                        }
                    }
                }
            }
            if (direction.equals("DOWN")) {
                for (int l=0;l<moiY.length;l++) {
                    if (((advY[l]==posY+1)&&(advX[l]==posX))||((moiY[l]==posY+1)&&(moiX[l]==posX))||(posY==19)) {
                        if (((advX[l]==posX+1)&&(advY[l]==posY))||((moiX[l]==posX+1)&&(moiY[l]==posY))||(posX==29)) {
                            direction="LEFT";
                        }
                        else if (((advX[l]!=posX+1)||(advY[l]!=posY))&&((moiX[l]!=posX+1)||(moiY[l]!=posY))&&(posX!=29)) {
                            direction="RIGHT";
                        }
                        if (((advX[l]==posX-1)&&(advY[l]==posY))||((moiX[l]==posX-1)&&(moiY[l]==posY))||(posX==0)) {
                            direction="RIGHT";
                        }
                        else if (((advX[l]!=posX-1)||(advY[l]!=posY))&&((moiX[l]!=posX-1)||(moiY[l]!=posY))&&(posX!=0)) {
                            direction="LEFT";
                            }    
                    }
                }
            }
            if (direction.equals("LEFT")) {
                for (int m=0;m<moiY.length;m++) {
                    if (((advX[m]==posX-1)&&(advY[m]==posY))||((moiX[m]==posX-1)&&(moiY[m]==posY))||(posX==0)) {
                        if (((advY[m]==posY+1)&&(advX[m]==posX))||((moiY[m]==posY+1)&&(moiY[m]==posX))||(posY==29)) {
                            direction="UP";
                        }
                        else if (((advY[m]!=posY+1)||(advX[m]!=posX))&&((moiY[m]!=posY+1)||(moiY[m]!=posX))&&(posY!=29)){
                            direction="DOWN";
                        }
                        if (((advY[m]==posY-1)&&(advX[m]==posX))||((moiY[m]==posY-1)&&(moiX[m]==posX))||(posY==0)) {
                            direction="DOWN";
                        }
                        else if (((advY[m]!=posY-1)||(advX[m]!=posX))&&((moiY[m]!=posY-1)||(moiX[m]!=posX))&&(posY!=0)){
                            direction="UP";
                        }
                    }
                }
            }
            System.out.println(direction);                                                                    
        }
    }
}