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
        int surfaceN = in.nextInt(); // the number of points used to draw the surface of Mars.
        //////////////////////////////////////////////////////////////////////////  MES VARIABLES  ///////////////////////////////////////////////////////////////                                                                        
        int landingSpotX=0;
        int landingSpotY=0;
        int rotation=0;
        int deriveDroite=0;
        int deriveGauche=0;
        int altitude=0;
        int[] tabX=new int[6999];
        int[] tabY=new int[2999];
        String puissanceReacteur="0";
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        for (int i = 0; i < surfaceN; i++) {
            int landX = in.nextInt(); // X coordinate of a surface point. (0 to 6999)
            int landY = in.nextInt(); // Y coordinate of a surface point. By linking all the points together in a sequential fashion, you form the surface of Mars.
            tabX[i]=landX;
            tabY[i]=landY;
        }
        for (int j=0; j<surfaceN ;j++) {                                                    // Définition du point d'atterrissage
            if ( ( (tabX[j]-tabX[j+1])*-1>=1000) && (tabY[j]==tabY[j+1]) ){
                landingSpotX=tabX[j]+500;
                landingSpotY=tabY[j];
            }
        }
        // game loop
        while (true) {
            int X = in.nextInt();
            int Y = in.nextInt();
            int hSpeed = in.nextInt(); // the horizontal speed (in m/s), can be negative.
            int vSpeed = in.nextInt(); // the vertical speed (in m/s), can be negative.
            int fuel = in.nextInt(); // the quantity of remaining fuel in liters.
            int rotate = in.nextInt(); // the rotation angle in degrees (-90 to 90).
            int power = in.nextInt(); // the thrust power (0 to 4).

        //////////////////////////////////////////////////////////////////////////  CODE SLIKEE  ///////////////////////////////////////////////////////////////
            deriveDroite=X-landingSpotX;                                                    
            deriveGauche=landingSpotX-X;
            altitude=Y-landingSpotY;
            boolean surVitesse=false;
            if (vSpeed>1) {                                                                // Contrôle de la vitesse verticale (gère la poussée du réacteur)
                puissanceReacteur="0";
            }
            else if (vSpeed==0) {
                puissanceReacteur="1";
            }
            else if ((vSpeed<0) && (vSpeed>=-15)) {
                puissanceReacteur="2";
            }
            else if ((vSpeed<-15) && (vSpeed>=-25)) {
                puissanceReacteur="3";
            } 
            else if (vSpeed<-25) {
                puissanceReacteur="4";
            } 
            if ((hSpeed>19) && ((deriveGauche<=500) || (deriveDroite<=500))) {            // Contrôle de la vitesse horizontale (gère la rotation)
                surVitesse=true;
            }
            else if ((hSpeed<-19) && ((deriveGauche<=500) || (deriveDroite<=500))) {
                surVitesse=true;
            }
            else {
                surVitesse=false;
            }
            
            if (X>landingSpotX) {                                                        // Calculs des rotations de la fusée selon sa position par rapport au landingSpot
                if (deriveDroite>1500) {
                    rotation=2;
                }
                else if ((deriveDroite>1000) && (deriveDroite<=1500)) {
                    rotation=22;
                }
                else if ((deriveDroite>500) && (deriveDroite<=1000)) {
                    rotation=22;
                }
                else if ((deriveDroite>400) && (deriveDroite<=500)) {
                    rotation=22;
                }
                else if ((deriveDroite>0) && (deriveDroite<=400)) {
                    rotation=22;
                } 
            }
            else if (X<landingSpotX) {
                if (deriveGauche>1500) {
                    rotation=-22;
                }
                else if ((deriveGauche>1000) && (deriveGauche<=1500)) {
                    rotation=-22;
                }
                else if ((deriveGauche>500) && (deriveGauche<=1000)) {
                    rotation=-22;
                }
                else if ((deriveGauche>400) && (deriveGauche<=500)) {
                    rotation=-22;
                }
                else if ((deriveGauche>0) && (deriveGauche<=400)) {
                    rotation=-22;
                }
            }
            else if (X==landingSpotX) {
                rotation=0;
            }
            if (altitude<=100) {
                rotation=0;
            }
            
            if ((surVitesse==true) && (altitude>=100)) {
                if (hSpeed>40) {
                    rotation=70;
                }
                else if (hSpeed<-40) {
                    rotation=-70;
                }
            }
            //System.out.println(landingSpotX);
            System.out.println(rotation+" "+puissanceReacteur);
            surVitesse=false;
        }
    }
}