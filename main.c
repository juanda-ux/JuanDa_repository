#include <stdio.h>
#include <math.h>

int interfaz(int* operacion,double* var1,double* var2);
double suma(double x,double y);
double resta(double x,double y);
double producto(double x,double y);
double division(double x,double y);
double raiz(double x);


int main() {
    int operacion;
    double var1, var2;
    if (!interfaz(&operacion,&var1,&var2)) {return -1;}
    switch (operacion) {
        case 1: {
            printf("%lf + %lf = %lf\n", var1, var2, suma(var1,var2));
            break;
        }
        case 2: {
            printf("%lf - %lf = %lf\n", var1, var2, resta(var1,var2));
            break;
        }
        case 3: {
            printf("%lf * %lf = %lf\n", var1, var2, producto(var1,var2));
            break;
        }
        case 4: {
            printf("%lf / %lf = %lf\n", var1, var2, resta(var1,var2));
            break;
        }
        case 5:{
            printf("raiz(%lf) = %lf\n", var1, raiz(var1));
            break;
        }
        default:
            printf("El codigo de operacion introducido no es valido");
    }
    return 0;
}

int interfaz(int* operacion,double* var1,double* var2){
    printf("Introduce el codigo de la la operacion a realizar suma(1), resta(2), producto(3), division(4), raiz cuadrada(5):\n");
    if (!scanf("%d", operacion)) {printf("Entrada invalida\n"); return 0;}
    printf("Introduce el primer operando:");
    if (!scanf("%lf", var1)) {printf("Entrada invalida\n"); return 0;}
    if ((*operacion)<5) {
        printf("Introduce el segundo operando:");
        if (!scanf("%lf", var2)) {printf("Entrada invalida\n"); return 0;}
    }
    return 1;
}
double suma(double x,double y) {
    return x+y;
}
double resta(double x,double y){
    return x-y;
}
double producto(double x,double y){
    return x*y;
}
double division(double x,double y){
    return x/y;
}

double raiz(double x){
    return sqrt(x);
}
