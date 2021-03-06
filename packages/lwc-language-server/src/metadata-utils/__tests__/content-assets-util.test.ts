import { mockFileUtil } from './mock-file-util';
import { indexContentAssets } from '../content-assets-util';
import { validate } from './util';
// @ts-ignore
import { WorkspaceContext } from 'lightning-lsp-common';

jest.mock('lightning-lsp-common', () => {
    const real = jest.requireActual('lightning-lsp-common');
    return { utils: mockFileUtil(), WorkspaceContext: real.WorkspaceContext };
});

it('indexContentAssets', async done => {
    const expectedDTS = `declare module "@salesforce/contentAssetUrl/logo" {
    var logo: string;
    export default logo;
}
`;

    await validate(indexContentAssets, 'sfdx-workspace', 'force-app', 'contentassets.d.ts', expectedDTS);
    done();
});
