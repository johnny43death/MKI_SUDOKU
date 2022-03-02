#include <iostream>
#include <string>
#include <ctime>
using namespace std;

int main()
{
    const int SIDE = 11;
    int inputPosY = 0, inputPosX = 0, inputValue = 0;
    int board[SIDE][SIDE] = { 0 };
    bool finished = false;

    while (!finished) {
        for (int i = 1; i < SIDE - 1; i++, cout << endl)
            for (int j = 1; j < SIDE - 1; j++) {
                cout << board[j][i] << " ";
            }
        do {
            std::cout << "x y v: ";
            std::cin >> inputPosX >> inputPosY >> inputValue;
        } while (inputPosX < 1
            || inputPosX > 9
            || !(inputPosX == inputPosX)
            || inputPosY < 1
            || inputPosY > 9
            || !(inputPosY == inputPosY)
            || inputValue < 1
            || inputValue > 9
            || !(inputValue == inputPosX)
            );

        board[inputPosX][inputPosY] = inputValue;
    }
}