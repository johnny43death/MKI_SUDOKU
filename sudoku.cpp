#include <iostream>
#include <string>
#include <ctime>
using namespace std;

int main()
{
    const int SIDE = 11;
    int inputPosY, inputPosX, inputValue;
    int board[SIDE][SIDE] = { 0 };
    bool finished = false;

    while (!finished) {
        for (int i = 1; i < SIDE - 1; i++, cout << endl)
            for (int j = 1; j < SIDE - 1; j++) {
                cout << board[j][i] << " ";
            }
        std::cout << "x y v: ";
        std::cin >> inputPosX >> inputPosY >> inputValue;
        board[inputPosX][inputPosY] = inputValue;
    }
}