if (targetRam > ns.getServerMaxRam(purchasedServers[0])) {
    if (ns.getServerMoneyAvailable('home') * settings.totalMoneyAllocation >= targetRam * settings.gbRamCost) {
      
      let myOldUUID = purchasedServers[0].substring(12,purchasedServers[0].length)
      let hostname = `pserv-${targetRam}-${myOldUUID}`

      await ns.killall(purchasedServers[0])
      await ns.sleep(10)
      let serverDeleted = await ns.deleteServer(purchasedServers[0])

       if (serverDeleted) {
        hostname = await ns.purchaseServer(hostname, targetRam)

        if (hostname) {
          ns.tprint(`[${localeHHMMSS()}] Upgraded: ${purchasedServers[0]} into server: ${hostname} (${targetRam} GB)`)

          purchasedServers[0] = hostname
          updateServer(ns, serverMap, hostname)
          didChange = true
        }
      }
    }