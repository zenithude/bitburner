/** @param {NS} ns **/

const settings = {
	homeRamReserved: 20,
	homeRamReservedBase: 20,
	homeRamExtraRamReserved: 12,
	homeRamBigMode: 64,
	minSecurityLevelOffset: 1,
	maxMoneyMultiplayer: 0.9,
	minSecurityWeight: 100,
	mapRefreshInterval: 24 * 60 * 60 * 1000,
	maxWeakenTime: 30 * 60 * 1000,
	keys: {
		serverMap: 'BB_SERVER_MAP',
	},
	changes: {
		hack: 0.002,
		grow: 0.004,
		weaken: 0.05,
	},
};

var server = ['n00dles', 'foodnstuff', 'sigma-cosmetics', 'joesguns', 'nectar-net', 'hong-fang-tea', 'harakiri-sushi', 'neo-net', 'CSEC', 'zer0', 'max-hardware', 'iron-gym', 'phantasy', 'silver-helix', 'omega-net', 'avmnite-02h', 'crush-fitness', 'johnson-ortho', 'the-hub', 'I.I.I.I', 'rothman-uni', 'comptek', 'netlink', 'catalyst', 'aevum-police', 'summit-uni', 'millenium-fitness', 'rho-construction', 'alpha-ent', 'syscore', 'lexo-corp', 'snap-fitness', 'zb-institute', 'global-pharm', 'galactic-cyber', 'omnia', 'defcomm', 'taiyang-digital', 'zb-def', 'nova-med', 'univ-energy', 'zeus-med', 'unitalife', 'icarus', 'infocomm', 'solaris', 'aerocorp', 'deltaone', 'microdyne', 'helios', 'kuai-gong', 'titan-labs', 'stormtech', '4sigma', '.', 'vitalife', 'applied-energetics', 'fulcrumtech', 'omnitek', 'run4theh111z', 'clarkinc', 'megacorp', 'powerhouse-fitness', 'The-Cave', 'b-and-a', 'ecorp', 'nwo', 'fulcrumassets', 'blade']

function getItem(key) {
	let item = localStorage.getItem(key)

	return item ? JSON.parse(item) : undefined
}

function setItem(key, value) {
	localStorage.setItem(key, JSON.stringify(value))
}

function convertMSToHHMMSS(ms = 0) {
  if (ms <= 0) {
    return '00:00:00'
  }

  if (!ms) {
    ms = new Date().getTime()
  }

  return new Date(ms).toISOString().substr(11, 8)
}

function localeHHMMSS(ms = 0) {
	if (!ms) {
		ms = new Date().getTime();
	}

	return new Date(ms).toLocaleTimeString();
}

async function getHackableServers(ns, servers) {

	const hackableServers = Object.keys(servers)

	hackableServers.sort((a, b) => servers[a].ram - servers[b].ram)
	return hackableServers
}

export async function main(ns) {
	ns.tprint(`[${localeHHMMSS()}] starting mainHack_zen.js`);

	let hostname = ns.getHostname();

	if (hostname !== 'home') {
		throw new Exception('Run the script from home !')
	}

	for (let i = 0; i < server.length; i++) {
		const target = server[i];
		const hack_time = convertMSToHHMMSS(ns.getHackTime(target));
		const grow_time = convertMSToHHMMSS(ns.getGrowTime(target));
		const weak_time = convertMSToHHMMSS(ns.getWeakenTime(target));
		if (ns.hasRootAccess(target)) {
			if (ns.getServerMaxMoney(target) !== 0) {
				if (ns.getServerMoneyAvailable(target) > 999999) {
					ns.tprint(`[${localeHHMMSS()}] Start hack ${target} for ${hack_time}`);
					await ns.hack(target);
				} else {
					ns.tprint(`[${localeHHMMSS()}] Start grow ${target} for ${grow_time}`);
					await ns.grow(target);
					ns.tprint(`[${localeHHMMSS()}] Start weak ${target} for ${weak_time}`);
					await ns.weaken(target);
				}
			}

		}
	}
}

