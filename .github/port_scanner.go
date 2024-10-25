package main

import (
    "fmt"
    "net"
    "time"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    for i := 1; i <= 1024; i++ {
        wg.Add(1)
        go func(port int) {
            defer wg.Done()
            address := fmt.Sprintf("192.168.0.1:%d", port)
            conn, err := net.DialTimeout("tcp", address, 1*time.Second)
            if err != nil {
                // port fermé ou filtré
                return
            }
            conn.Close()
            fmt.Printf("Port %d ouvert\n", port)
        }(i)
    }
    wg.Wait() // Attend que toutes les goroutines se terminent
}
