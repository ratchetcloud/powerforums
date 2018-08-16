/**
 * Get URL of specific node.
 * @param nodeId: ID of node
 * @param suffix: Suffix for url. Default is '';
 * @returns String. Absolute path of URL
 */
export function nodeUrl(nodeId, suffix='') {
    return '/n/' + nodeId + '/' + suffix;
}