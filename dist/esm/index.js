import { NativeEventEmitter, NativeModules } from "react-native";
import { BleScanCallbackType, BleScanMatchCount, BleScanMatchMode, BleScanMode, } from "./types";
export * from "./types";
let bleManager = NativeModules.BleManager;
class BleManager extends NativeEventEmitter {
    constructor() {
        super(bleManager);
        this.isPeripheralConnected = this.isPeripheralConnected.bind(this);
    }
    /**
     *
     * @param peripheralId
     * @param serviceUUID
     * @param characteristicUUID
     * @returns data as an array of numbers (which can be converted back to a Uint8Array (ByteArray) using something like [Buffer.from()](https://github.com/feross/buffer))
     */
    read(peripheralId, serviceUUID, characteristicUUID) {
        return new Promise((fulfill, reject) => {
            bleManager.read(peripheralId, serviceUUID, characteristicUUID, (error, data) => {
                if (error) {
                    reject(error);
                }
                else {
                    fulfill(data);
                }
            });
        });
    }
    /**
     *
     * @param peripheralId
     * @param serviceUUID
     * @param characteristicUUID
     * @param descriptorUUID
     * @returns data as an array of numbers (which can be converted back to a Uint8Array (ByteArray) using something like [Buffer.from()](https://github.com/feross/buffer))
     */
    readDescriptor(peripheralId, serviceUUID, characteristicUUID, descriptorUUID) {
        return new Promise((fulfill, reject) => {
            bleManager.readDescriptor(peripheralId, serviceUUID, characteristicUUID, descriptorUUID, (error, data) => {
                if (error) {
                    reject(error);
                }
                else {
                    fulfill(data);
                }
            });
        });
    }
    /**
     *
     * @param peripheralId
     * @param serviceUUID
     * @param characteristicUUID
     * @param descriptorUUID
     * @param data data to write as an array of numbers (which can be converted from a Uint8Array (ByteArray) using something like [Buffer.toJSON().data](https://github.com/feross/buffer))
     * @returns
     */
    writeDescriptor(peripheralId, serviceUUID, characteristicUUID, descriptorUUID, data) {
        return new Promise((fulfill, reject) => {
            bleManager.writeDescriptor(peripheralId, serviceUUID, characteristicUUID, descriptorUUID, data, (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    fulfill();
                }
            });
        });
    }
    /**
     *
     * @param peripheralId
     * @returns a promise resolving with the updated RSSI (`number`) if it succeeds.
     */
    readRSSI(peripheralId) {
        return new Promise((fulfill, reject) => {
            bleManager.readRSSI(peripheralId, (error, rssi) => {
                if (error) {
                    reject(error);
                }
                else {
                    fulfill(rssi);
                }
            });
        });
    }
    /**
     * [Android only]
     * @param peripheralId
     * @returns a promise that resolves to a boolean indicating if gatt was successfully refreshed or not.
     */
    refreshCache(peripheralId) {
        return new Promise((fulfill, reject) => {
            bleManager.refreshCache(peripheralId, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    fulfill(result);
                }
            });
        });
    }
    /**
     *
     * @param peripheralId
     * @param serviceUUIDs [iOS only] optional filter of services to retrieve.
     * @param characteristicFilters [iOS only] optional array of tuples [serviceUUID, characteristicUUID] to filter specific characteristics.
     * @returns
     */
    retrieveServices(peripheralId, serviceUUIDs = [], characteristicFilters = [], discoverDescriptors = true, discoverIncludedServices = true) {
        return new Promise((fulfill, reject) => {
            bleManager.retrieveServices(peripheralId, serviceUUIDs, characteristicFilters, discoverDescriptors, discoverIncludedServices, (error, peripheral) => {
                if (error) {
                    reject(error);
                }
                else {
                    fulfill(peripheral);
                }
            });
        });
    }
    /**
     *
     * @param peripheralId
     * @param serviceUUID
     * @param characteristicUUID
     * @param data data to write as an array of numbers (which can be converted from a Uint8Array (ByteArray) using something like [Buffer.toJSON().data](https://github.com/feross/buffer))
     * @param maxByteSize optional, defaults to 20
     * @returns
     */
    write(peripheralId, serviceUUID, characteristicUUID, data, maxByteSize = 20) {
        return new Promise((fulfill, reject) => {
            bleManager.write(peripheralId, serviceUUID, characteristicUUID, data, maxByteSize, (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    fulfill();
                }
            });
        });
    }
    /**
     *
     * @param peripheralId
     * @param serviceUUID
     * @param characteristicUUID
     * @param data data to write as an array of numbers (which can be converted from a Uint8Array (ByteArray) using something like [Buffer.toJSON().data](https://github.com/feross/buffer))
     * @param maxByteSize optional, defaults to 20
     * @param queueSleepTime optional, defaults to 10. Only useful if data length is greater than maxByteSize.
     * @returns
     */
    writeWithoutResponse(peripheralId, serviceUUID, characteristicUUID, data, maxByteSize = 20, queueSleepTime = 10) {
        return new Promise((fulfill, reject) => {
            bleManager.writeWithoutResponse(peripheralId, serviceUUID, characteristicUUID, data, maxByteSize, queueSleepTime, (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    fulfill();
                }
            });
        });
    }
    connect(peripheralId, options) {
        return new Promise((fulfill, reject) => {
            if (!options) {
                options = {};
            }
            bleManager.connect(peripheralId, options, (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    fulfill();
                }
            });
        });
    }
    /**
     * [Android only]
     * @param peripheralId
     * @param peripheralPin optional. will be used to auto-bond if possible.
     * @returns
     */
    createBond(peripheralId, peripheralPin = null) {
        return new Promise((fulfill, reject) => {
            bleManager.createBond(peripheralId, peripheralPin, (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    fulfill();
                }
            });
        });
    }
    /**
     * [Android only]
     * @param peripheralId
     * @returns
     */
    removeBond(peripheralId) {
        return new Promise((fulfill, reject) => {
            bleManager.removeBond(peripheralId, (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    fulfill();
                }
            });
        });
    }
    /**
     *
     * @param peripheralId
     * @param force [Android only] defaults to true.
     * @returns
     */
    disconnect(peripheralId, force = true) {
        return new Promise((fulfill, reject) => {
            bleManager.disconnect(peripheralId, force, (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    fulfill();
                }
            });
        });
    }
    startNotification(peripheralId, serviceUUID, characteristicUUID) {
        return new Promise((fulfill, reject) => {
            bleManager.startNotification(peripheralId, serviceUUID, characteristicUUID, (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    fulfill();
                }
            });
        });
    }
    /**
     * [Android only]
     * @param peripheralId
     * @param serviceUUID
     * @param characteristicUUID
     * @param buffer
     * @returns
     */
    startNotificationUseBuffer(peripheralId, serviceUUID, characteristicUUID, buffer) {
        return new Promise((fulfill, reject) => {
            bleManager.startNotificationUseBuffer(peripheralId, serviceUUID, characteristicUUID, buffer, (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    fulfill();
                }
            });
        });
    }
    stopNotification(peripheralId, serviceUUID, characteristicUUID) {
        return new Promise((fulfill, reject) => {
            bleManager.stopNotification(peripheralId, serviceUUID, characteristicUUID, (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    fulfill();
                }
            });
        });
    }
    checkState() {
        return new Promise((fulfill, _) => {
            bleManager.checkState((state) => {
                fulfill(state);
            });
        });
    }
    start(options) {
        return new Promise((fulfill, reject) => {
            if (options == null) {
                options = {};
            }
            bleManager.start(options, (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    fulfill();
                }
            });
        });
    }
    /**
     *
     * @param serviceUUIDs
     * @param seconds amount of seconds to scan. if set to 0 or less, will scan until you call stopScan() or the OS stops the scan (background etc).
     * @param allowDuplicates [iOS only]
     * @param scanningOptions optional map of properties to fine-tune scan behavior, see DOCS.
     * @returns
     */
    scan(serviceUUIDs, seconds, allowDuplicates, scanningOptions = {}) {
        return new Promise((fulfill, reject) => {
            if (allowDuplicates == null) {
                allowDuplicates = false;
            }
            // (ANDROID) Match as many advertisement per filter as hw could allow
            // depends on current capability and availability of the resources in hw.
            if (scanningOptions.numberOfMatches == null) {
                scanningOptions.numberOfMatches = BleScanMatchCount.MaxAdvertisements;
            }
            // (ANDROID) Defaults to MATCH_MODE_AGGRESSIVE
            if (scanningOptions.matchMode == null) {
                scanningOptions.matchMode = BleScanMatchMode.Aggressive;
            }
            // (ANDROID) Defaults to SCAN_MODE_LOW_POWER
            if (scanningOptions.scanMode == null) {
                scanningOptions.scanMode = BleScanMode.LowPower;
            }
            // (ANDROID) Defaults to CALLBACK_TYPE_ALL_MATCHES
            // WARN: sometimes, setting a scanSetting instead of leaving it untouched might result in unexpected behaviors.
            // https://github.com/dariuszseweryn/RxAndroidBle/issues/462
            if (scanningOptions.callbackType == null) {
                scanningOptions.callbackType = BleScanCallbackType.AllMatches;
            }
            // (ANDROID) Defaults to 0ms (report results immediately).
            if (scanningOptions.reportDelay == null) {
                scanningOptions.reportDelay = 0;
            }
            // In Android ScanFilter used to restrict search to devices with a specific advertising name.
            // https://developer.android.com/reference/android/bluetooth/le/ScanFilter.Builder#setDeviceName(java.lang.String)
            // In iOS, this is a whole word match, not a partial search.
            if (!scanningOptions.exactAdvertisingName) {
                delete scanningOptions.exactAdvertisingName;
            }
            else {
                if (typeof scanningOptions.exactAdvertisingName === "string") {
                    scanningOptions.exactAdvertisingName = [
                        scanningOptions.exactAdvertisingName,
                    ];
                }
            }
            bleManager.scan(serviceUUIDs, seconds, allowDuplicates, scanningOptions, (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    fulfill();
                }
            });
        });
    }
    stopScan() {
        return new Promise((fulfill, reject) => {
            bleManager.stopScan((error) => {
                if (error) {
                    reject(error);
                }
                else {
                    fulfill();
                }
            });
        });
    }
    /**
     * [Android only] triggers an ENABLE_REQUEST intent to the end-user to enable bluetooth.
     * @returns
     */
    enableBluetooth() {
        return new Promise((fulfill, reject) => {
            bleManager.enableBluetooth((error) => {
                if (error) {
                    reject(error);
                }
                else {
                    fulfill();
                }
            });
        });
    }
    /**
     *
     * @param serviceUUIDs [optional] not used on android, optional on ios.
     * @returns
     */
    getConnectedPeripherals(serviceUUIDs = []) {
        return new Promise((fulfill, reject) => {
            bleManager.getConnectedPeripherals(serviceUUIDs, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (result) {
                        fulfill(result);
                    }
                    else {
                        fulfill([]);
                    }
                }
            });
        });
    }
    /**
     * [Android only]
     * @returns
     */
    getBondedPeripherals() {
        return new Promise((fulfill, reject) => {
            bleManager.getBondedPeripherals((error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (result) {
                        fulfill(result);
                    }
                    else {
                        fulfill([]);
                    }
                }
            });
        });
    }
    getDiscoveredPeripherals() {
        return new Promise((fulfill, reject) => {
            bleManager.getDiscoveredPeripherals((error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (result) {
                        fulfill(result);
                    }
                    else {
                        fulfill([]);
                    }
                }
            });
        });
    }
    /**
     * [Android only]
     * @param peripheralId
     * @returns
     */
    removePeripheral(peripheralId) {
        return new Promise((fulfill, reject) => {
            bleManager.removePeripheral(peripheralId, (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    fulfill();
                }
            });
        });
    }
    /**
     * @param peripheralId
     * @param serviceUUIDs [optional] not used on android, optional on ios.
     * @returns
     */
    isPeripheralConnected(peripheralId, serviceUUIDs = []) {
        return this.getConnectedPeripherals(serviceUUIDs).then((result) => {
            if (result.find((p) => p.id === peripheralId)) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    /**
     * @param peripheralId
     * @param serviceUUIDs [optional] not used on android, optional on ios.
     * @returns
     */
    isScanning() {
        return new Promise((fulfill, reject) => {
            bleManager.isScanning((error, status) => {
                if (error) {
                    reject(error);
                }
                else {
                    fulfill(status);
                }
            });
        });
    }
    /**
     * [Android only, API 21+]
     * @param peripheralId
     * @param connectionPriority
     * @returns a promise that resolves with a boolean indicating of the connection priority was changed successfully, or rejects with an error message.
     */
    requestConnectionPriority(peripheralId, connectionPriority) {
        return new Promise((fulfill, reject) => {
            bleManager.requestConnectionPriority(peripheralId, connectionPriority, (error, status) => {
                if (error) {
                    reject(error);
                }
                else {
                    fulfill(status);
                }
            });
        });
    }
    /**
     * [Android only, API 21+]
     * @param peripheralId
     * @param mtu size to be requested, in bytes.
     * @returns a promise resolving with the negotiated MTU if it succeeded. Beware that it might not be the one requested due to device's BLE limitations on both side of the negotiation.
     */
    requestMTU(peripheralId, mtu) {
        return new Promise((fulfill, reject) => {
            bleManager.requestMTU(peripheralId, mtu, (error, mtu) => {
                if (error) {
                    reject(error);
                }
                else {
                    fulfill(mtu);
                }
            });
        });
    }
    /**
     * [Android only, API 26+]
     *
     * @returns
     */
    getAssociatedPeripherals() {
        return new Promise((fulfill, reject) => {
            bleManager.getAssociatedPeripherals((error, peripherals) => {
                if (error) {
                    reject(error);
                }
                else {
                    fulfill(peripherals || []);
                }
            });
        });
    }
    /**
     * [Android only, API 26+]
     * @param peripheralId Peripheral to remove
     * @returns Promise that resolves once the peripheral has been removed. Rejects
     *          if no association is found.
     */
    removeAssociatedPeripheral(peripheralId) {
        return new Promise((fulfill, reject) => {
            bleManager.removeAssociatedPeripheral(peripheralId, (error) => {
                if (error !== null) {
                    reject(error);
                }
                else {
                    fulfill();
                }
            });
        });
    }
    /**
     * [Android only]
     *
     * Check if current device supports companion device manager.
     *
     * @return Promise resolving to a boolean.
     */
    supportsCompanion() {
        return new Promise(fulfill => {
            bleManager.supportsCompanion((supports) => fulfill(supports));
        });
    }
    /**
     * [Android only, API 26+]
     *
     * Start companion scan.
     */
    companionScan(serviceUUIDs, options = {}) {
        return new Promise((fulfill, reject) => {
            bleManager.companionScan(serviceUUIDs, options, (error, peripheral) => {
                if (error) {
                    reject(error);
                }
                else {
                    fulfill(peripheral);
                }
            });
        });
    }
    /**
     * [Android only]
     * @param name
     */
    setName(name) {
        bleManager.setName(name);
    }
    /**
     * [iOS only]
     * @param peripheralId
     * @returns
     */
    getMaximumWriteValueLengthForWithoutResponse(peripheralId) {
        return new Promise((fulfill, reject) => {
            bleManager.getMaximumWriteValueLengthForWithoutResponse(peripheralId, (error, max) => {
                if (error) {
                    reject(error);
                }
                else {
                    fulfill(max);
                }
            });
        });
    }
    /**
     * [iOS only]
     * @param peripheralId
     * @returns
     */
    getMaximumWriteValueLengthForWithResponse(peripheralId) {
        return new Promise((fulfill, reject) => {
            bleManager.getMaximumWriteValueLengthForWithResponse(peripheralId, (error, max) => {
                if (error) {
                    reject(error);
                }
                else {
                    fulfill(max);
                }
            });
        });
    }
}
export default new BleManager();
//# sourceMappingURL=index.js.map