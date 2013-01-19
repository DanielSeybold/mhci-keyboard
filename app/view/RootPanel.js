/*
 * File: app/view/RootPanel.js
 *
 * This file was generated by Sencha Architect version 2.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.0.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.view.RootPanel', {
    extend: 'Ext.Panel',

    requires: [
        'MyApp.view.StartPanel',
        'MyApp.view.TestPanel'
    ],

    config: {
        ui: '',
        layout: {
            animation: 'fade',
            type: 'card'
        },
        scrollable: false,
        listeners: [
            {
                fn: 'onPanelShow',
                event: 'show'
            }
        ],
        items: [
            {
                xtype: 'startpanel'
            },
            {
                xtype: 'testpanel'
            }
        ]
    },

    onPanelShow: function(component, options) {
        if(facebook.userId == 0){
            // show Login-Window
            Ext.Msg.alert('', 'Welcome!<br/>Continue to facebook login?', function(){
                document.location.href = facebook.loginUrl;
            }, this);
        }else{

            if(appState.userknown){
                // show Introduction-Window
                Ext.Msg.alert('', 'Sorry, ' + facebook.username + ' you have done this already.', function(){
                    // show bye-site
                }, this);    
            }else{
                // show Introduction-Window
                Ext.Msg.alert('', 'Hi ' + facebook.username + '! Thanks for visiting. Let\'s start?', function(){
                    this.showIntroduction(1);
                }, this);        
            }
        }
    },

    showIntroduction: function(step) {
        if(step == 1){
            Ext.Msg.alert('Introduction', 'Please hold your tablet in landscape with both hands. Use only your thumbs for interacting. Let\'s start?', function(){
                this.showIntroduction(2);
            }, this);
        }else if(step == 2){
            this.startTest();
        }

    },

    startTest: function() {
        this.testresults = [];
        this.doStep(0);
    },

    doStep: function(number) {
        if(number == 0){
            // Test 1, Durchlauf 1:
            this.setActiveItem(1);
            var testpanel = this.getActiveItem();

            var keyboard = (appState.firstTest == 'a') ? new MyApp.view.Keyboard() : new MyApp.view.KeyboardFittsLaw();
            testpanel.setKeyboard(keyboard);

            var task = new Ext.util.DelayedTask(function() {
                // Werte des Tests rausholen
                this.testresults.push({
                    characters: this.characterCounter,
                    errors: this.characterErrorCounter
                });

                this.doStep(0.5);
            }, this);
            task.delay(5000);
            testpanel.startTest();
        }else if(number == 0.5){
            Ext.Msg.alert('', 'Thank you, please do it once more ...', function(){
                this.doStep(1);
            }, this);

        }else if(number == 1){
            // Test 1, Durchlauf 2:
            this.setActiveItem(1);
            var testpanel = this.getActiveItem();
            var task = new Ext.util.DelayedTask(function() {
                this.testresults.push({
                    characters: this.characterCounter,
                    errors: this.characterErrorCounter
                });            
                this.doStep(1.5);
            }, this);
            task.delay(5000);
            testpanel.startTest();
        }else if(number == 1.5){
            Ext.Msg.alert('', 'Thank you, please do it once more ...', function(){
                this.doStep(2);
            }, this);

        }else if(number == 2){
            // Test 1, Durchlauf 3:
            this.setActiveItem(1);
            var testpanel = this.getActiveItem();
            var task = new Ext.util.DelayedTask(function() {
                this.testresults.push({
                    characters: this.characterCounter,
                    errors: this.characterErrorCounter
                });
                this.doStep(2.5);
            }, this);
            task.delay(5000);
            testpanel.startTest();
        }else if(number == 2.5){
            Ext.Msg.alert('', 'Thank you! Now try another keyboard layout.', function(){
                this.doStep(3);
            }, this);    

        }else if(number == 3){
            // Test 2, Durchlauf 1:
            this.setActiveItem(1);
            var testpanel = this.getActiveItem();

            var keyboard = (appState.firstTest == 'a') ? new MyApp.view.KeyboardFittsLaw() : new MyApp.view.Keyboard();
            testpanel.setKeyboard(keyboard);

            var task = new Ext.util.DelayedTask(function() {
                this.testresults.push({
                    characters: this.characterCounter,
                    errors: this.characterErrorCounter
                });
                this.doStep(3.5);
            }, this);
            task.delay(5000);
            testpanel.startTest();        
        }else if(number == 3.5){
            Ext.Msg.alert('', 'Thank you, please do it once more ...', function(){
                this.doStep(4);
            }, this);      

        }else if(number == 4){
            // Test 2, Durchlauf 2:
            this.setActiveItem(1);
            var testpanel = this.getActiveItem();
            var task = new Ext.util.DelayedTask(function() {
                this.testresults.push({
                    characters: this.characterCounter,
                    errors: this.characterErrorCounter
                });
                this.doStep(4.5);
            }, this);
            task.delay(5000);
            testpanel.startTest();        
        }else if(number == 4.5){
            Ext.Msg.alert('', 'Thank you, please do it once more ...', function(){
                this.doStep(5);
            }, this);      

        }else if(number == 5){
            // Test 2, Durchlauf 3:
            this.setActiveItem(1);
            var testpanel = this.getActiveItem();
            var task = new Ext.util.DelayedTask(function() {
                this.testresults.push({
                    characters: this.characterCounter,
                    errors: this.characterErrorCounter
                });
                this.doStep(5.5);
            }, this);
            task.delay(5000);
            testpanel.startTest();        
        }else if(number == 5.5){
            Ext.Msg.alert('', 'Thats all. Now we will upload your usage informations.', function(){
                this.uploadData()
            }, this);      


        }
    },

    uploadData: function() {

        Ext.Ajax.request({
            url: 'upload.php',
            params: {
                test11Characters: this.testresults[0].characters,
                test11Errors: this.testresults[0].errors,

                test12Characters: this.testresults[1].characters,
                test12Errors: this.testresults[1].errors,

                test13Characters: this.testresults[2].characters,
                test13Errors: this.testresults[2].errors,

                test21Characters: this.testresults[3].characters,
                test21Errors: this.testresults[3].errors,

                test22Characters: this.testresults[4].characters,
                test22Errors: this.testresults[4].errors,

                test23Characters: this.testresults[5].characters,
                test23Errors: this.testresults[5].errors
            },
            success: function(response){
                //var text = response.responseText;
                Ext.Msg.alert('', 'Great! Finished!', function(){
                    this.setActiveItem(0);
                }, this)
            }
        });


    }

});