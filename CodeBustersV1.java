import java.util.*;
import java.io.*;
import java.math.*;

/**
 * Send your busters out into the fog to trap ghosts and bring them home!
 **/
class Player {

    public static void main(String args[]) {
        Scanner in = new Scanner(System.in);
        int bustersPerPlayer = in.nextInt(); // the amount of busters you control
        int ghostCount = in.nextInt(); // the amount of ghosts on the map
        int myTeamId = in.nextInt(); // if this is 0, your base is on the top left of the map, if it is one, on the bottom right
        String ordres=new String();
        String ordres2=new String();
        ordres="    ";
        ordres2="    ";
        boolean bust=false;
        boolean release=false;
        int myBusterX=0;
        int myBusterY=0;
        int ghostX=0;
        int ghostY=0;
        int myBaseX=0;
        int myBaseY=0;
        if (myTeamId==0) { 
            myBaseX=600;
            myBaseY=600;
            }
        else if (myTeamId==1) {
            myBaseX=15400;
            myBaseY=8400;
        }
        // game loop
        while (true) {
            int entities = in.nextInt(); // the number of busters and ghosts visible to you
            for (int i = 0; i < entities; i++) {
                int entityId = in.nextInt(); // buster id or ghost id
                int x = in.nextInt();
                int y = in.nextInt(); // position of this buster / ghost
                int entityType = in.nextInt(); // the team id if it is a buster, -1 if it is a ghost.
                int state = in.nextInt(); // For busters: 0=idle, 1=carrying a ghost.
                int value = in.nextInt(); // For busters: Ghost id being carried. For ghosts: number of busters attempting to trap this ghost.
                
                ////////////////////////////////////////////////////////////////////DEBUT DE MON CODE////////////////////////////////////////////////////////////////
                
                
                if (entityType==-1) {                                                       // SI C'EST UN F
                    ghostX=x;
                    ghostY=y;
                    int ghostId=entityId;
                    if (((x>900) && (x<1760)) || ((y>900) && (y<1760)) && (bust==false)) {      // S'il est à portée, le bust
                        ordres="BUST "+entityId;
                    }
                    else if (bust==false) {                                                     // Sinon le traquer
                        ordres="MOVE "+(ghostX+901)+" "+(ghostY+901);
                    }
                    else if ((ghostX>2200) && (ghostY>2200)) {                                  // Si bust raté revenir au milieu
                        ordres="MOVE "+8000+" "+4500;
                    }
                }
                
                if (entityType==myTeamId) {                                                 // SI  C'EST UN B ALLIE
                    myBusterX=x;
                    myBusterY=y;
                    if (bust==false) {                                                          // s'il ne fait rien alors qu'il bouge
                        ordres="MOVE "+8000+" "+4500;
                    }
                    if ((bust==true) && (state==1)) {                                           // S'il porte un F, rentrer à la base
                        ordres="MOVE "+myBaseX+" "+myBaseY;
                    }
                    if ((bust==true) && ((x==myBaseX) && (y==myBaseY))) {                               // Le Release à la base
                        ordres="RELEASE";
                    }
                    if (release==true) {
                        if ((myBusterX<15000) && (myBusterY<8000) && (myTeamId==0)) {
                        ordres="MOVE "+(x+400)+" "+(y+300);                                     // après release repartir à la chasse
                        }
                        else if ((myBusterX>=15000) && (myBusterY>=8000) && (myTeamId==0)) {
                        ordres="MOVE "+(x-400)+" "+(y-300);                                     // après release repartir à la chasse
                        }
                    }
                    if ((myBusterX>=16000) && (myBusterY>=9000)) {                              // s'il arrive en coin de map revenir au milieu
                        ordres="MOVE "+15300+" "+8300;
                    }
                    if ((myBusterX==901) && (myBusterY==901)) {
                        ordres="MOVE "+8000+" "+4500;
                    }
                    if ((myBusterX==8000) && (myBusterY==4500)) {
                        ordres="MOVE "+myBaseX+" "+myBaseY;
                    }
                }
                
                if (((entityType!=-1) && (entityType!=myTeamId)) && (state==1)) {           // SI C'EST UN B ENNEMI AVEC UN F
                    if (((x>900) && (x<1760)) || ((y>900) && (y<1760))) {                        // S'il est à portée, le bust
                        ordres="BUST "+entityId;
                    }
                    else if (bust==false) {                                                      // Sinon le traquer
                        ordres="MOVE "+(x+901)+" "+(y+901);
                    }
                }
            }
            for (int i = 0; i < bustersPerPlayer; i++) {
                if (ordres.substring(0,4).equals("BUST")) {
                    bust=true;
                    release=false;
                }
                else if (ordres.equals("RELEASE")) {
                    bust=false;
                    release=true;
                }
                
                System.out.println(ordres); // MOVE x y | BUST id | RELEASE
                
            }
        }
    }
}