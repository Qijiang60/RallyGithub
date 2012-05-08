Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    require: [
        'Ext.state.Manager',
        'Ext.state.LocalStorageProvider',
        'Ext.state.CookieProvider',
        'changeset.data.GithubAdapter',
        'changeset.ui.ChangesetBrowser'
    ],
    componentCls: 'app',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    launch: function() {
        var provider;
        try {
            provider = Ext.create('Ext.state.LocalStorageProvider');
        } catch (e) {
            provider = Ext.create('Ext.state.CookieProvider');
        }
        Ext.state.Manager.setProvider(provider);

        this.adapter = Ext.create('changeset.data.GithubAdapter', {
            listeners: {
                ready: this._onAdapterReady,
                authenticationrequired: this._onAuthenticationRequired,
                scope: this
            }
        });
    },

    _onAdapterReady: function(adapter) {
        this.removeAll();
        this.add({
            xtype: 'changesetbrowser',
            margin: '0 5 5 5',
            border: 0,
            adapter: adapter,
            flex: 1
        });
    },

    _onAuthenticationRequired: function(adapter) {
        this.removeAll();
        this.add({
            flex: 1,
            border: 0,
            adapter: adapter,
            items: [{
                xtype: 'changesetlogin',
                border: 0,
                adapter: adapter
            }]
        });
    }
});
