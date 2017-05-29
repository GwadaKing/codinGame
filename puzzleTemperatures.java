import java.util.*;
import java.io.*;
import java.math.*;
class Solution {
    public static void main(String args[]) {
        Scanner in = new Scanner(System.in);
        int n = in.nextInt();
        in.nextLine();
        String temps = in.nextLine();
        String[] temps2=temps.split(" ");
        int[] tabTemp=new int[n];
        int minPos=5527;
        int minNeg=-274;
        int minDef=0;
        for (int l=0; l<n; l++) {
                tabTemp[l]=Integer.parseInt(temps2[l]);
            }
        if ((n>0) && (n!=1)) {
            for (int i=0;i<n;i++) {
                if (tabTemp[i]>0) {
                    if (tabTemp[i]<minPos) {
                        minPos=tabTemp[i];
                    }
                    else if (tabTemp[i]>minPos) {
                    }
                    else if (tabTemp[i]==minPos) {
                        minPos=tabTemp[i];
                    }
                }
                else if (tabTemp[i]<0) {
                    if (tabTemp[i]>minNeg) {
                        minNeg=tabTemp[i];
                    }
                    else if (tabTemp[i]==minNeg) {
                        minNeg=tabTemp[i];
                    }
                    else if (tabTemp[i]<minNeg) {
                    }
                }
                else if (tabTemp[i]==0) {
                    i++;
                }
            }
            if ((minPos==0) && (minNeg==0)) {
                minDef=0;
            }
            if (minPos<minNeg*-1) {
                minDef=minPos;
            }
            else if (minPos>minNeg*-1) {
                minDef=minNeg;
            }
            else if (minPos==minNeg*-1) {
                minDef=minPos;
            }
        }
        else if (n==0) {
            minDef=0;
        }
        else if (n==1) {
            if (tabTemp[0]==0) {
                minDef=0;
            }
            else if (tabTemp[0]!=0) {
                minDef=tabTemp[0];
            }
        }
        System.out.println(minDef);
    }
}