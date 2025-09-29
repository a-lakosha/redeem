{
    'name': 'Redeem Digital Wallet Theme',
    'version': '19.0.1.0.0',
    'sequence': 1,
    'category': 'Theme/Business',
    'summary': 'Digital wallet landing page',
    'description': """
Redeem Digital Wallet Theme
    """,
    'author': 'Pearl Pixels',
    'website': 'https://www.pearlpixels.com',
    'depends': ['theme_common'],
    'images': [
        'static/description/redeem_description.jpg',
        'static/description/redeem_screenshot.jpg',
    ],
    'data': [
        # Homepage template
        'data/home.xml',
        # Layout
        'data/footer.xml',
        'data/header.xml',

        # Theme assets and images
        'data/data.xml',

        # website menu structure
        'data/menu.xml',
    ],
    'installable': True,
    'application': False,
    'auto_install': False,
    'license': 'LGPL-3',
}
