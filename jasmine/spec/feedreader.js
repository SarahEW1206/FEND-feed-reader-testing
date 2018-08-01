/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
 $(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */

         /* allFeeds is defined in app.js; it's an array of objects 
          * and each object contains the name and URL of a feed.
          */
          it('are defined', function() {
            // First we make sure the array has been defined. 
            expect(allFeeds).toBeDefined();
            /* Since allFeeds is an array, we can make sure it's not 
             * empty by testing that the length is not 0.
             */
             expect(allFeeds.length).not.toBe(0);
         });


        /* This text loops through each feed in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it('all have URLs', function() {
            /* We can't run this test if allFeeds is not defined */
            expect(allFeeds).toBeDefined();
            /* Loops through each object (feed) in allFeeds and checks that the  */
            for (var feed of allFeeds) {
                /* Makes sure there is a URL key in each object, 
                * but doesn't tell us if the value is blank or not. */
                expect(feed.url).toBeDefined();
                /* Makes sure the url value at least contains "http". I'm sure there is a 
                 * regex that could validate that they are actual URLS, 
                 * but for now, this will at least alert you if your URL 
                 * doesn't contain http or https.
                 */
                 expect(feed.url).toContain('http');
             }

         });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('all have names', function() {
            /* We can't run this test if allFeeds is not defined */
            expect(allFeeds).toBeDefined();
            
            /* Loops through each object (feed) in allFeeds and checks that the  */
            for (var feed of allFeeds) {
                /* Makes sure there is a name key in each object, 
                * but doesn't tell us if the value is blank or not. */
                expect(feed.name).toBeDefined();
                /* Makes sure there is a name value in each object, 
                * that is at least 1 character long. */
                expect(feed.name.length > 0).toBe(true);
            }

        });
     });

    describe('The menu', function() {

        /* This is a test that ensures the menu element is
         * hidden by default.
         */

         it('is hidden by default', function() {
            /* By looking at the HTML, we see that the 'menu-hidden' 
             * class is applied to/removed from the body element, so we grab that element.
             */
             const body = document.querySelector('body');
            /* We expect that list of classes on the body will 
            * contain the menu-hidden class when initially loaded */
            expect(body.classList).toContain('menu-hidden');
        });

         /* This is a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

          it('changes visbility on click', function() {
            /* grab the body */
            const body = document.querySelector('body');
            /* grab the menu icon */
            const menuIcon = document.querySelector('.menu-icon-link');

            /* force a click event on the menu icon. */
            menuIcon.click();
            /* This click event should REMOVE the 'menu-hidden' class */
            expect(body.classList).not.toContain('menu-hidden');

            /* force a 2nd click event on the menu icon. */
            menuIcon.click();
            /* This click event should ADD back the 'menu-hidden' class */
            expect(body.classList).toContain('menu-hidden');


        });


      });


    describe('Initial Entries', function() {

        /* This is a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * The loadFeed() function is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */


         /* Load the first feed and wait until it is done loading */
         beforeEach(function(done) {
            loadFeed(0, done);
        });


         /* Now check to see if it has at least on entry */
         it('has at least one entry', function(){
            /* Get a list of all entries that are within the .feed container */
            const entries = document.querySelectorAll('.feed .entry');
            /* Check the length of that list and expect that it should be greater than 0 */
            expect(entries.length > 0).toBe(true);
        });

     });



    describe('New Feed Selection', function() {



        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

         /* Set up empty arrays to collect the contents of our feeds. 
          * We will compare them against one another in our test.
          */
          let feedOne = [];
          let feedTwo = [];

          /* Use beforeEach to handle our async function, loadFeed. */
          beforeEach(function(done) {
            /* Load the first feed */
            loadFeed(0);
            /* Get a list of all entries in the feed... */ 
            const entries = document.querySelectorAll('.feed .entry');
            /* Convert the list to an iterable array and assign it to feedOne variable */
            feedOne = Array.from(entries);
            /* Load the 2nd feed and then we are done; we can move on. */
            loadFeed(1, done);

        });

          it('content changes when loaded', function() {
            /* Get the list of entries again now that the new feed has loaded. */
            const entries = document.querySelectorAll('.feed .entry');
            /* Convert the list to an iterable array and assign it to feedTwo variable */
            feedTwo = Array.from(entries)
            /* Compare the two arrays at any corresponding index and expect that they won't be the same. */
            expect(feedOne[0] === feedTwo[0]).toBe(false);
            /* Could also do another index just to be certain! */
            expect(feedOne[1] === feedTwo[1]).toBe(false);

        });

      });


}());
